import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/helpers/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  role: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = !!this.authService.isAuth;
    this.role = atob(this.authService.isAuth);
  }
}
