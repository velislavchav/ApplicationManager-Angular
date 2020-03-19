import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ApplicationsSectionComponent } from './components/applications/applications-section/applications-section.component';
import { CreateApplicationComponent } from './components/user/create-application/create-application.component';
import { CreateJobComponent } from './components/user/create-job/create-job.component';
import { JobsSectionComponent } from './components/jobs/jobs-section/jobs-section.component';


const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'applications', component: ApplicationsSectionComponent},
  {path: 'applications/create', component: CreateApplicationComponent},
  {path: 'jobs', component: JobsSectionComponent},
  {path: 'jobs/create', component: CreateJobComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
