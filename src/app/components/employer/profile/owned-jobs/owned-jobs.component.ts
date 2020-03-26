import { Component, Input, OnInit } from '@angular/core';
import { IJob } from 'src/app/helpers/interfaces/IJob';

@Component({
  selector: 'app-owned-jobs',
  templateUrl: './owned-jobs.component.html',
  styleUrls: ['./owned-jobs.component.css']
})
export class OwnedJobsComponent implements OnInit {
  @Input() ownedJobs: Array<IJob>;
  jobs: Array<IJob> = [];

  ngOnInit() {
    this.jobs = this.ownedJobs.slice(0, 3);
  }
}
