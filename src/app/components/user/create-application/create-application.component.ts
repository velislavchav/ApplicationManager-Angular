import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent {
  createApplicationForm: FormGroup;
  emailRegexPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createApplicationForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      // age: ['', [Validators.required, Validators.pattern(this.emailRegexPattern)]],
      
      wayOfCommunication: ['Prefered way of communication', [Validators.required]],
      englishLevel: ['English level', [Validators.required]],
      
    })
  }

  submitApplication() {
    
  }

}
