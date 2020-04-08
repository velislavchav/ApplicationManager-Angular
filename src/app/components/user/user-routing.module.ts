import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserDataResolver } from 'src/app/helpers/resolvers/user-data.service';
import { UserGuard } from 'src/app/helpers/guards/user.guard';
import { AuthGuard } from 'src/app/helpers/guards/auth.guard';

const userRoutes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: 'register',
                canActivate: [AuthGuard],
                component: RegisterComponent,
            },
            {
                path: 'login',
                canActivate: [AuthGuard],
                component: LoginComponent,
            },
            {
                path: 'profile',
                canActivate: [UserGuard],
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
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);