import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserDataResolver } from 'src/app/helpers/resolvers/user-data.service';

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
                children: [
                    {
                        path: '',
                        component: ProfileComponent,
                    },
                    {
                        path: 'edit-profile',
                        component: EditProfileComponent,
                        resolve: { userInfo: UserDataResolver }
                    },
                ]
            },
            {
                path: 'create',
                children: [
                    {
                        path: 'job',
                        component: CreateJobComponent,
                    },
                ]
            }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);