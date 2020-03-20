import { Routes, RouterModule } from '@angular/router';
import { JobsSectionComponent } from './jobs-section/jobs-section.component';

const jobRoutes: Routes = [
    {
        path: 'jobs', component: JobsSectionComponent
    },
];

export const JobsRoutingModule = RouterModule.forChild(jobRoutes);