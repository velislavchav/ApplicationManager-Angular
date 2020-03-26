import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployerRoutingModule } from './employer-routing.module';
import { CreateJobComponent } from './create-job/create-job.component';
import { ProfileComponent } from './profile/profile.component';
import { OwnedJobsComponent } from './profile/owned-jobs/owned-jobs.component';



@NgModule({
  declarations: [RegisterComponent, CreateJobComponent, ProfileComponent, OwnedJobsComponent, ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployerRoutingModule,
  ]
})
export class EmployerModule { }
