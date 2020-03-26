import { Routes, RouterModule } from '@angular/router';
import { JobsSectionComponent } from './jobs-section/jobs-section.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { UserDataResolver } from 'src/app/helpers/resolvers/user-data.service';

const jobRoutes: Routes = [
    {
        path: 'jobs',
        children: [
            {
                path: '',
                component: JobsSectionComponent
            },
            {
                path: 'details/:id',
                component: JobDetailsComponent,
                resolve: { usrData: UserDataResolver}
            }
        ]
    },
];

export const JobsRoutingModule = RouterModule.forChild(jobRoutes);