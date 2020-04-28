import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
