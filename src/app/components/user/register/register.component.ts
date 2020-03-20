import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/helpers/services/user.service';

function passwordsMatch(c: AbstractControl) {
  return c.value.password === c.value.repeatPassword ? null : { passwordsMatch: true }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  emailRegexPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegexPattern)]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      }, { validators: [passwordsMatch] }),
      gender: ['Gender', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      profilePicture: [''],
    })
  }

  tryRegister() {
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.passwords.password;
    const gender = this.registerForm.value.gender;
    const phone = this.registerForm.value.phone;
    const role = 'user';
    let profilePicture = this.registerForm.value.profilePicture;
    profilePicture === '' ? profilePicture = 'https://www.upv.edu.ph/images/2019/06/07/no-profile.png' : '';  
    this.userService.signUp(username, email, password, gender, phone, profilePicture, role);
  }
}