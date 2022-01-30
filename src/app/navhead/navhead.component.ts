import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoadingService } from '../loading.service';
import { User } from '../user';

@Component({
  selector: 'app-navhead',
  templateUrl: './navhead.component.html',
  styleUrls: ['./navhead.component.css']
})
export class NavheadComponent implements OnInit {

  loading: boolean = false;
  isLoggedIn: boolean = false;
  user: User;

  constructor(public _loading: LoadingService, private authService: AuthService, private router: Router){
    
      this.authService.user.subscribe({
        next: (user) => {
          this.user = user;
        }
      })
    
  }

  ngOnInit(): void {
      this.listenToLoading();

      this.user = this.authService.getUser();

      this.isLoggedIn = this.authService.isLoggedIn;
      
  }

  listenToLoading(): void{
    this._loading.loadingSub
    .pipe(delay(0))
    .subscribe((loading) =>{
      this.loading = loading;
    });
  }

  logout(): void{
    
    this.authService.logout();
    
    location.reload();
  }
  
}
