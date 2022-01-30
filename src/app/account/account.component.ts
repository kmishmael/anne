import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent  {

  constructor() { }

}


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  //styleUrls: ['./account.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/';
  isLoggedIn: boolean = false;
  currentUser: User;
  login$: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
      // redirect to home if already logged in
      if (this.authService.userValue) 
      {
        this.router.navigate(['/articles']);
      }

     }
ngOnInit(): void {
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

}

login() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  
  let user: User = this.loginForm.value;

  this.login$ = this.authService.login(user)
  .pipe(first())
  .subscribe({
    next: () => {
      this.router.navigateByUrl(this.returnUrl);

    },
    error: (err) => {
      var alert = document.getElementById('error');
      alert.innerHTML = 'Email or Password is Incorrect';
      this.loading = false
    }, 
  })
}

logout(): void {
  this.isLoggedIn = false;
  localStorage.removeItem('user');
  localStorage.removeItem('user-token');
  this.router.navigate(['/articles']);
}

ngOnDestroy(): void {
  this.login$.unsubscribe();  
}

  }



@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  loginData: User;
  register$: Subscription;

  constructor(private authService: AuthService, private router: Router, private loginComponent: LoginComponent) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  

  }

  signUp(): void{
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        var user: User = this.registerForm.value;
        this.register$ =  this.authService.register(user)
            .pipe(first())
            .subscribe({
              error: (err) => {
                this.loading = false;
              },
              complete: () => {
                this.loading = false;
                this.router.navigate(['/users/login']);
              }
            });
            
  }

  ngOnDestroy(): void {
    this.register$.unsubscribe();
  }

}
