import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolver implements Resolve<any> {

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = this.authService.getUserId();
    return this.authService.getUser(userId)
      .pipe(take(1))
      .toPromise().then((data) => {
        return data;
      })

    // return new Promise(resolve => {
    //   this.userService.getUser(userId)
    //   .pipe(
    //     take(1)
    //   ).subscribe(data => {
    //     resolve(data);
    //   });
    // })
  };
}
