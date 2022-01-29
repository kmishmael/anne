import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

const AUTH_API = 'api/users/';

const httpOptions ={
  headers: new HttpHeaders({ 'content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public isLoggedIn = false; 


  constructor(private httpClient: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(localStorage.getItem('user') as unknown as User);
    this.user = this.userSubject.asObservable();
   }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(`${AUTH_API}authenticate`, user)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user)
      return user;
    }),
      retry(3)
    );
  }

  register(user: User): Observable<any>{
    return this.httpClient.post(`${AUTH_API}register`, user, httpOptions);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/articles']);

  }

  getUser(): any {
    const user = window.localStorage.getItem('user');
    if (user) {
      const _user  =  JSON.parse(user);
      this.isLoggedIn = _user.email == null ? false : true;
      return _user;
    }
    return {};
  }
}
