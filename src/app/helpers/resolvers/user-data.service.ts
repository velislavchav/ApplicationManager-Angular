import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { take } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolver implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = this.userService.getUserId();
    return this.userService.getUser(userId)
      .pipe(take(1))
      .toPromise().then((data) => {
        return data as IUser
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
