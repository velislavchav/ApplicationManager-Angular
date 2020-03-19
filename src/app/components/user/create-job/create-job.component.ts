import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent {
  createJobForm: FormGroup;
  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createJobForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      salary: ['', [Validators.required, Validators.min(550)]],
      degree: ['Needed education degree', [Validators.required]],
      englishLevel: ['English level', [Validators.required]],
    })
  }

  createJob() {
    
  }
}
