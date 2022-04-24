import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-regis',
  templateUrl: './login-regis.component.html',
  styleUrls: ['./login-regis.component.scss']
})
export class LoginRegisComponent implements OnInit {


  form: FormGroup;
  data: IUser = {
    email: '',
    password: '',
    displayName:'',
    photoURL:''
  };
  errorMessage: string

  // email: string;
  // password: string;
  isLogin = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,],
      displayName: ['', Validators.required,],
      photoURL:['']
    });
  }

  ngOnInit(): void {
  }

  get email() {
    return this.form.get('email') as FormGroup;
  }

  get password() {
    return this.form.get('password') as FormGroup;
  }

  onSubmit() {
    console.log('form', this.form);
    this.data = {
      ...this.form.value
    }
    if (this.form.valid) {
      if (this.isLogin === true) {
        this.authService
          .login(this.data)
          .then(() => this.router.navigate(['/']))
          .catch((e:any) => this.errorMessage = e.message);
      } else {
        this.authService
          .register(this.data)
          .then((res : any) => {
            console.log('register',res);
            window.location.reload();
          })
          .catch((e :any) => this.errorMessage = e.message);
      }
    }

  }

  loginStatus() {
    this.isLogin = true;
    this.form.reset();
    this.errorMessage = '';
  }
  signUpStatus() {
    this.isLogin = false;
    this.form.reset();
    this.errorMessage = '';
  }

}
