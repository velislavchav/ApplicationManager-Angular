import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/helpers/services/user.service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/helpers/interfaces/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userSubscriber: Subscription;
  currentUser: IUser;
  skillsSelectedByUser: Array<string> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    this.userSubscriber = this.userService.getUser(userId).subscribe(data => {
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
