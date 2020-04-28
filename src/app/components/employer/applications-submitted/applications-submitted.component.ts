import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployerService } from 'src/app/helpers/services/employer.service';
import { AuthService } from 'src/app/helpers/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applications-submitted',
  templateUrl: './applications-submitted.component.html',
  styleUrls: ['./applications-submitted.component.css']
})
export class ApplicationsSubmittedComponent implements OnInit, OnDestroy {
  applications = [];
  subscription: Subscription;
  constructor(private employerService: EmployerService, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.subscription = this.employerService.getApplications(userId).subscribe(data => {
      this.applications = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
