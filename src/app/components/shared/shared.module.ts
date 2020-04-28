import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [HomeComponent, LoaderComponent, NavigationComponent, NotFoundComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [HomeComponent, LoaderComponent, NavigationComponent, NotFoundComponent]
})
export class SharedModule { }
