import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  //styleUrls: ['./account.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/';
  isLoggedIn: boolean = false;
  currentUser: User;

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

  this.authService.login(user)
  .pipe(first())
  .subscribe({
    next: () => {
      this.router.navigateByUrl(this.returnUrl);

    },
    error: (err) => {
      console.log(err);
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
  }
/*
  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage()
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}

*/

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  //styleUrls: ['./account.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) { }

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
        this.authService.register(user)
            .pipe(first())
            .subscribe({
              next: (data) => {
                this.router.navigate(['/login']);
              },
              error: (err) => {
                this.loading = false;
              }
            });
            
  }

}
