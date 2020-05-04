import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployerService } from 'src/app/helpers/services/employer.service';
import { AuthService } from 'src/app/helpers/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/helpers/services/user.service';
import { IUser } from 'src/app/helpers/interfaces/IUser';

@Component({
  selector: 'app-applications-submitted',
  templateUrl: './applications-submitted.component.html',
  styleUrls: ['./applications-submitted.component.css']
})
export class ApplicationsSubmittedComponent implements OnInit, OnDestroy {
  applications = [];
  userViewProfile = null;
  isLoading: boolean = true;
  employerSubscription: Subscription;
  userSubscription: Subscription;
  constructor(private employerService: EmployerService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    this.employerSubscription = this.employerService.getApplications(userId).subscribe(data => {
      this.applications = data;
      this.isLoading = false;
    });
  }

  rejectApplication(job, senderId) {
    this.userSubscription = this.authService.getUser(senderId).subscribe(usr => {
      this.userService.removeApplication(job, usr);
    })
  }

  viewUserProfile(selectedUser: IUser) {
    let userTechSkillsArray = [];
    for (const key in selectedUser.techSkills) {
      if (selectedUser.techSkills[key] === true) {
        userTechSkillsArray.push(key);
      }
    }
    this.userViewProfile = {
      ...selectedUser,
      techSkills: userTechSkillsArray.join(', '),
    };
  }

  ngOnDestroy(): void {
    this.employerSubscription.unsubscribe();
    this.userSubscription ? this.userSubscription.unsubscribe() : '';
  }
}
