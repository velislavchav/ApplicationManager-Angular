import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmployer } from 'src/app/helpers/interfaces/IEmployer';
import { AuthService } from 'src/app/helpers/services/auth.service';
import { JobsService } from 'src/app/helpers/services/jobs.service';
import { IJob } from 'src/app/helpers/interfaces/IJob';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  employerSubscriber: Subscription;
  jobsSubscriber: Subscription;
  currentEmployer: IEmployer;
  ownedJobs: Array<IJob> = [];
  employerId: string = this.authService.getUserId();

  constructor(private authService: AuthService, private jobsService: JobsService) { 
  }

  ngOnInit(): void {
    this.jobsSubscriber = this.jobsService.loadOwnedJobs(this.employerId).subscribe(data => {
      this.employerSubscriber = this.authService.getUser(this.employerId).subscribe(usrData => {
        this.ownedJobs = data;
        this.currentEmployer = usrData;
      })
    });
  }

  ngOnDestroy() {
    this.employerSubscriber ? this.employerSubscriber.unsubscribe() : '';
    this.jobsSubscriber ? this.jobsSubscriber.unsubscribe() : '';
  }
}
