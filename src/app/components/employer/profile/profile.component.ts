import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmployer } from 'src/app/helpers/interfaces/IEmployer';
import { AuthService } from 'src/app/helpers/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employerSubscriber: Subscription;
  currentEmployer: IEmployer;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.employerSubscriber = this.authService.getUser(userId).subscribe(data => {
      this.currentEmployer = data;
      // for (const key in data.techSkills) {
      //   if (data.techSkills[key] === true) {
      //     this.skillsSelectedByUser.push(key);
      //   }
      // }
    })
  }

  ngOnDestroy() {
    this.employerSubscriber ? this.employerSubscriber.unsubscribe() : '';
  }
}
