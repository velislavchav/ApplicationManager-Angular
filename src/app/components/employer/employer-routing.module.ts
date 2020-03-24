import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { ProfileComponent } from './profile/profile.component';


const employerRoutes: Routes = [
    {
        path: 'employer',
        children: [
            {
                path: 'register',
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