import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/helpers/services/user.service';
import { ActivatedRoute } from '@angular/router';

function passwordsMatch(c: AbstractControl) {
  return c.value.password === c.value.repeatPassword ? null : { passwordsMatch: true }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  currentUrlSegment: string;
  registerForm: FormGroup;
  usernameRegexPattern: RegExp = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  emailRegexPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
    this.currentUrlSegment = route.snapshot.parent.url[0].path; // check the url segment

    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.pattern(this.usernameRegexPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegexPattern)]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      }, { validators: [passwordsMatch] }),
    })
  }

  tryRegister() {
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.passwords.password;
    this.userService.signUp(username, email, password);
  }

  get f(): any {
    return this.registerForm.controls;
  }
}