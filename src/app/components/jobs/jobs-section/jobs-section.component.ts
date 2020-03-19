import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { IJob } from 'src/app/interfaces/IJob';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs-section',
  templateUrl: './jobs-section.component.html',
  styleUrls: ['./jobs-section.component.css']
})
export class JobsSectionComponent implements OnInit, OnDestroy {
  jobs: Array<IJob>;
  private subscription: Subscription;

  constructor(public route: ActivatedRoute, private jobsService: JobsService) { }

  ngOnInit(): void {
    this.subscription = this.jobsService.loadJobs().subscribe(data => {
      this.jobs = data
    })
  }

  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : '';
  }

}
