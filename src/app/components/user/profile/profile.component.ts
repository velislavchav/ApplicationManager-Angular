import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/helpers/interfaces/IUser';
import { AuthService } from 'src/app/helpers/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userSubscriber: Subscription;
  currentUser: IUser;
  skillsSelectedByUser: Array<string> = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.userSubscriber = this.authService.getUser(userId).subscribe(data => {
      this.currentUser = data;
      for (const key in data.techSkills) {
        if (data.techSkills[key] === true) {
          this.skillsSelectedByUser.push(key);
        }
      }
    })
  }

  ngOnDestroy() {
    this.userSubscriber ? this.userSubscriber.unsubscribe() : '';
  }
}
