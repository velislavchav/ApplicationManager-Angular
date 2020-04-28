import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployerService } from 'src/app/helpers/services/employer.service';
import { AuthService } from 'src/app/helpers/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/helpers/services/user.service';

@Component({
  selector: 'app-applications-submitted',
  templateUrl: './applications-submitted.component.html',
  styleUrls: ['./applications-submitted.component.css']
})
export class ApplicationsSubmittedComponent implements OnInit, OnDestroy {
  applications = [];
  subscription: Subscription;
  userSubscription: Subscription;
  constructor(private employerService: EmployerService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.subscription = this.employerService.getApplications(userId).subscribe(data => {
      this.applications = data;
    });
  }

  rejectApplication(job, senderId) {
    this.userSubscription = this.authService.getUser(senderId).subscribe(usr => {
      this.userService.removeApplication(job, usr);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userSubscription ? this.userSubscription.unsubscribe() : '';
  }
}
