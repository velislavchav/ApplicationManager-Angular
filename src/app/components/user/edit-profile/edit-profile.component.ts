import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/helpers/services/user.service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/helpers/interfaces/IUser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editProfileForm: FormGroup;
  newSelectedTechSkills: {} = {
    javascript: false,
    cSharp: false,
    java: false,
    python: false,
    php: false,
    wordpress: false,
    mySql: false,
    mongoDb: false,
    expressJs: false,
    reactJs: false,
    angular: false,
    vue: false,
    nodeJs: false,
    reactNative: false,
    autoCAD: false,
    firebase: false,
  };
  userSubscriber: Subscription;
  userDataResolver = this.route.snapshot.data.userInfo;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
    this.editProfileForm = this.fb.group({
      gender: [this.userDataResolver.gender],
      phone: [this.userDataResolver.phone, [Validators.minLength(10), Validators.maxLength(10)]],
      profilePicture: [this.userDataResolver.profilePicture],
      availability: [this.userDataResolver.availability],
      profession: [this.userDataResolver.profession],
      experience: [this.userDataResolver.experience],
      preferedWayOfCommunication: [this.userDataResolver.preferedWayOfCommunication],
      englishLevel: [this.userDataResolver.englishLevel],
      totalProjects: [+this.userDataResolver.totalProjects],
      projectsLink: [this.userDataResolver.projectsLink],
      moreInfo: [this.userDataResolver.moreInfo],
    })
  }

  ngOnInit() {
    
  }

  submitEditProfile() {
    const gender = this.editProfileForm.value.gender;
    const phone = this.editProfileForm.value.phone;
    let profilePicture = this.editProfileForm.value.profilePicture;
    profilePicture === '' ? profilePicture = 'https://i.ytimg.com/vi/eDBDthVSiS8/maxresdefault.jpg' : null;
    const availability = this.editProfileForm.value.availability;
    const profession = this.editProfileForm.value.profession;
    const experience = this.editProfileForm.value.experience;
    const preferedWayOfCommunication = this.editProfileForm.value.preferedWayOfCommunication;
    const englishLevel = this.editProfileForm.value.englishLevel;
    const totalProjects = +this.editProfileForm.value.totalProjects; //
    const projectsLink = this.editProfileForm.value.projectsLink;
    const moreInfo = this.editProfileForm.value.moreInfo;

    const newUserData = {
      uid: this.userDataResolver.uid,
      username: this.userDataResolver.username,
      email: this.userDataResolver.email,
      applications: this.userDataResolver.applications,
      gender,
      phone,
      profilePicture,
      availability,
      profession,
      experience,
      preferedWayOfCommunication,
      englishLevel,
      totalProjects,
      projectsLink,
      moreInfo,
      techSkills: this.newSelectedTechSkills
    }

    this.userService.updateUserData(newUserData);
  }

  checkTechSkill(event) {
    const chboxValue = event.target.value;
    const chboxIsChecked = event.target.checked;
    this.newSelectedTechSkills[chboxValue] = chboxIsChecked;
  }

  ngOnDestroy() {
  }
}