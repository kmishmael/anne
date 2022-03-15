import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

const AUTH_API = 'api/users/';

/*
const httpOptions ={
  headers: new HttpHeaders({ 'content-Type': 'application/json' })
};
*/

// available globally for injection to components through the constructor
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Behaviour subject => for the type interface User,copy of it is stored in the local storage.
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public isLoggedIn = false; // The default set login of the user 


  constructor(private httpClient: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(localStorage.getItem('user') as unknown as User);
    this.user = this.userSubject.asObservable();
   }

  public get userValue(): User {
    return this.userSubject.value;
  }
  
  // User login function
  login(user: User): Observable<any> {
    return this.httpClient.post<any>(`${AUTH_API}authenticate`, user)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user); // add the deatils of the user to the behaviour subject.
      // We will subscribe to this subject for any behavour changes.
      return user;
    }),
      retry(3) // retry logging for 3 times before timing out. 
      // Also to provide room for client network downtime etc.
    );
  }

  register(user: User): Observable<any>{
    // Function to register the user by sending the user data to the registration backend api
    // However, once registered the user has to be redirected to the login page for further
    // login to the page.
    return this.httpClient.post(`${AUTH_API}register`, user);
  }

  logout() {
    // Function to logout the user. using below procedures:
    /* => Remove the the user token from user cache(localstorage) for persistency between sessions
       => Set the userSubject <BehaviourSubject> to null.
       => Thus user has to be redirected to the main page public domain.
    */
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/articles']);

  }

  getUser(): any {
    /* At the beginning, launch of site, we want to check if there is a user who has been logged in, and 
    the session token has not expired, then we have to log in the user automatically. */
    const user = window.localStorage.getItem('user');
    if (user) {
      const _user  =  JSON.parse(user);
      this.isLoggedIn = _user.email == null ? false : true; // set islogged in checker(boolean)
      return _user; // return user details if is logged in.
    }
    return {};
  }
}
