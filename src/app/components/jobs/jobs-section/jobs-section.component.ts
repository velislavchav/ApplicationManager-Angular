import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/helpers/services/jobs.service';
import { IJob } from 'src/app/helpers/interfaces/IJob';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/helpers/services/user.service';
import { AuthService } from 'src/app/helpers/services/auth.service';
import { IUser } from 'src/app/helpers/interfaces/IUser';

@Component({
  selector: 'app-jobs-section',
  templateUrl: './jobs-section.component.html',
  styleUrls: ['./jobs-section.component.css']
})
export class JobsSectionComponent implements OnInit, OnDestroy {
  jobs: Array<IJob> = [];
  jobsSubscription: Subscription;
  jobSubscription: Subscription;
  userSubscription: Subscription;
  currentUser: IUser;

  constructor(private route: ActivatedRoute, private jobsService: JobsService, private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.userSubscription = this.authService.getUser(userId).subscribe(usr => {
      this.currentUser = usr;
      this.jobsSubscription = this.jobsService.loadJobs().subscribe(jobs => {
        for (const job of jobs) {
          const check = usr.applicationsId.find(el => el === job.id);
          if (check) {
            job['isSubmitedAlready'] = true;
          } else {
            job['isSubmitedAlready'] = false;
          }
        } // to check if user is applying for the jobs
        this.jobs = jobs;
      })
    })
    
  }

  sendApplication(jobId: string) {
    this.jobSubscription = this.jobsService.loadJob(jobId)
      .pipe(take(1)).subscribe(jobApplication => {
        this.userService.addApplication(jobApplication, this.currentUser);
      });
  }

  cancelApplication(jobId: string) {
    this.jobSubscription = this.jobsService.loadJob(jobId)
    .pipe(take(1)).subscribe(jobApplication => {
      this.userService.removeApplication(jobApplication, this.currentUser);
    });
  }

  ngOnDestroy(): void {
    this.jobsSubscription ? this.jobsSubscription.unsubscribe() : '';
    this.jobSubscription ? this.jobSubscription.unsubscribe() : '';
    this.userSubscription ? this.userSubscription.unsubscribe() : '';
  }
}
