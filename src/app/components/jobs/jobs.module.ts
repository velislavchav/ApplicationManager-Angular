import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsSectionComponent } from './jobs-section/jobs-section.component';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  declarations: [JobsSectionComponent],
  imports: [
    CommonModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
