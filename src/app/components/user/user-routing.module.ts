import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { CreateApplicationComponent } from './create-application/create-application.component';

const userRoutes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'create',
                children: [
                    {
                        path: 'job',
                        component: CreateJobComponent,
                    },
                    {
                        path: 'application',
                        component: CreateApplicationComponent,
                    }
                ]
            }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);