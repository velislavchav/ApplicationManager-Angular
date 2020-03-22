import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/helpers/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuth;
  }

}
