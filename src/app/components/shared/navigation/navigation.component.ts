import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/helpers/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  subscriber: Subscription;
  isAuth: boolean;
  userRole: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscriber = this.authService.isAuthChanged.subscribe(data => {
      data ? this.userRole = atob(this.authService.isAuth) : this.userRole = '';
      this.isAuth = data;
    });
    
    if (this.authService.isAuth) {
      this.userRole = atob(this.authService.isAuth);
      this.isAuth = true;
    } // makes sure the data is correct after reload
  }

  logout() {
    this.authService.logout().then(() => {
      this.isAuth = false;
    });
  }

  ngOnDestroy() {
    this.subscriber ? this.subscriber.unsubscribe() : '';
  }
}
