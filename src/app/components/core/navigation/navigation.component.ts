import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/helpers/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  subscriber: Subscription;
  isAuth: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscriber = this.userService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });
    
    if (this.userService.isAuth) {
      this.isAuth = true;
    }
  }

  logout() {
    this.userService.logout().then(() => {
      this.isAuth = false;
    });
  }

  ngOnDestroy() {
    this.subscriber ? this.subscriber.unsubscribe() : '';
  }
}
