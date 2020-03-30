import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/helpers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  emailRegexPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegexPattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    }) 
  }

  tryLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.signIn(email, password);
  }

  get f(): any {
    return this.loginForm.controls;
  }
}
