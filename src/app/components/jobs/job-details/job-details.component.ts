import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJob } from 'src/app/helpers/interfaces/IJob';
import { JobsService } from 'src/app/helpers/services/jobs.service';
import { AuthService } from 'src/app/helpers/services/auth.service';
import { UserService } from 'src/app/helpers/services/user.service';
import { IUser } from 'src/app/helpers/interfaces/IUser';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  jobId: string = this.route.snapshot.params['id'];
  isSubmittedAlready: boolean = false;
  currentJob: IJob;
  currentUser: IUser;
  userSubscription: Subscription;
  jobSubscription: Subscription;

  constructor(private route: ActivatedRoute, private jobsService: JobsService, private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    // load user info
    const userId = this.authService.getUserId();
    this.userSubscription = this.authService.getUser(userId).subscribe(usr => {
      this.currentUser = usr;
      this.currentUser.applicationsId?.indexOf(this.jobId) >= 0 ? this.isSubmittedAlready = true : this.isSubmittedAlready = false;
    });

    // load job info
    this.jobsService.loadJobDetails(this.jobId).then(job => {
      this.currentJob = job;
    });
  }

  sendApplication() {
    this.jobSubscription = this.jobsService.loadJob(this.jobId)
      .pipe(take(1)).subscribe(jobApplication => {
        this.userService.addApplication(jobApplication, this.currentUser);
      });
  }

  cancelApplication() {
    this.jobSubscription = this.jobsService.loadJob(this.jobId)
      .pipe(take(1)).subscribe(jobApplication => {
        this.userService.removeApplication(jobApplication, this.currentUser);
      });
  }

  deleteJob(job: IJob) {
    this.jobsService.deleteJob(job);
  }

  ngOnDestroy(): void {
    this.userSubscription ? this.userSubscription.unsubscribe() : '';
    this.jobSubscription ? this.jobSubscription.unsubscribe() : '';
  }
}
