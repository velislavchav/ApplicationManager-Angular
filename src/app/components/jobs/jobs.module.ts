import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsSectionComponent } from './jobs-section/jobs-section.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobDetailsComponent } from './job-details/job-details.component';

@NgModule({
  declarations: [JobsSectionComponent, JobDetailsComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
  ]
})
export class JobsModule { }
