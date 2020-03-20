import { Routes, RouterModule } from '@angular/router';
import { JobsSectionComponent } from './jobs-section/jobs-section.component';
import { JobDetailsComponent } from './job-details/job-details.component';

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
                component: JobDetailsComponent
            }
        ]
    },
];

export const JobsRoutingModule = RouterModule.forChild(jobRoutes);