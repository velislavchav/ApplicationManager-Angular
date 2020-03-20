import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/helpers/services/user.service';
import { JobsService } from 'src/app/helpers/services/jobs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnDestroy {
  createJobForm: FormGroup;
  subscriber: Subscription;
  selectedRequiredTechSkill: {} = {
    javascript: false,
    c: false,
    java: false,
    python: false,
    php: false,
    wordpress: false,
    mySql: false,
    mongoDb: false,
    expressJs: false,
    firebase: false,
    reactJs: false,
    angular: false,
    vue: false,
    nodeJs: false,
    reactNative: false,
  };
  
  constructor(private fb: FormBuilder, private userService: UserService, private jobsService: JobsService) {
    this.createJobForm = fb.group({
      jobPosition: ['', [Validators.required, Validators.minLength(4)]],
      salary: ['', [Validators.required, Validators.min(550)]],
      jobCategory: ['Job category', [Validators.required]],
      degree: ['Needed education degree', [Validators.required]],
      englishLevel: ['English level', [Validators.required]],
      advantages: ['']
    })
  }

  getRequiredTechSkill(event) {
    const chboxValue = event.target.value;
    const chboxIsChecked = event.target.checked;
    this.selectedRequiredTechSkill[chboxValue] = chboxIsChecked;
  }

  submitJob() {
    const jobPosition = this.createJobForm.value.jobPosition;
    const salary = +this.createJobForm.value.salary;
    const jobCategory = this.createJobForm.value.jobCategory;
    const degree = this.createJobForm.value.degree;
    const englishLevel = this.createJobForm.value.englishLevel;
    const advantages = this.createJobForm.value.advantages;
    const authorId = this.userService.getUserId();
    this.subscriber = this.userService.getUser(authorId).subscribe(data => {
      const authorName = data.username;
      this.jobsService.createJob(this.selectedRequiredTechSkill, jobPosition, salary, jobCategory, degree, englishLevel, 
        advantages, authorId, authorName);
    })
  }

  ngOnDestroy() {
    this.subscriber ? this.subscriber.unsubscribe() : '';
  }
}
