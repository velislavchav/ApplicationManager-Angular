import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployerGuard } from 'src/app/helpers/guards/employer.guard';
import { AuthGuard } from 'src/app/helpers/guards/auth.guard';


const employerRoutes: Routes = [
    {
        path: 'employer',
        canActivate: [EmployerGuard],
        children: [
            {
                path: 'register',
                canActivate: [AuthGuard],
                component: RegisterComponent,
            },
            {
                path: 'create/job',
                component: CreateJobComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
        ]
    },
];

export const EmployerRoutingModule = RouterModule.forChild(employerRoutes);