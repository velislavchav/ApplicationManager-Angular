import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJob } from 'src/app/helpers/interfaces/IJob';
import { Subscription } from 'rxjs';
import { JobsService } from 'src/app/helpers/services/jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  currentJob: IJob;
  userRole: string;
  constructor(private route: ActivatedRoute, private jobsService: JobsService) { }

  ngOnInit(): void {
    const jobId = this.route.snapshot.params['id'];
    this.userRole = this.route.snapshot.data.usrData['role'];    

    this.jobsService.loadJobDetails(jobId).then(job => {
      this.currentJob = job;
    });
  }
}
