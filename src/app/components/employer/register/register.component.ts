import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from 'src/app/helpers/services/employer.service';

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
  currentUrlSegment: string;

  constructor(private fb: FormBuilder, private employerService: EmployerService, private route: ActivatedRoute) {
    this.currentUrlSegment = route.snapshot.parent.url[0].path; // check the url segment

    this.registerForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegexPattern)]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      }, { validators: [passwordsMatch] }),
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      logo: [''],
      moreInfo: ['', [Validators.required, Validators.minLength(25)]]
    })
  }

  tryRegisterAsEmployer() {
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.passwords.password;
    const phone = this.registerForm.value.phone;
    let logo = this.registerForm.value.logo;
    logo === '' ? logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/No-logo.svg/1200px-No-logo.svg.png' : '';
    const moreInfo = this.registerForm.value.moreInfo;

    this.employerService.signUp(name, email, password, phone, logo, moreInfo);
  }

  get f(): any {
    return this.registerForm.controls;
  }
}
