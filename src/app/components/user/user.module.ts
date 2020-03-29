import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { SkillsComponent } from './profile/skills/skills.component';
import { MoreInfoComponent } from './profile/more-info/more-info.component';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, RegisterComponent, EditProfileComponent,
     SkillsComponent, MoreInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
