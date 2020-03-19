import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthChanged = new Subject<boolean>();
  constructor(private firestore: AngularFirestore,
    private dbAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) { }

  get isAuth() {
    return !!localStorage.getItem('email');
  }

  initializeAuthState() {
    this.dbAuth.authState.subscribe(() => {
      if (!!localStorage.getItem('email')) {
        this.isAuthChanged.next(true);
      } else {
        this.isAuthChanged.next(false);
      }
    });
  }

  signUp(username: string, email: string, password: string, gender: string, phone: string, profilePicture: string, role: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.pushUserData({ username, email, gender, phone, profilePicture, role });
        this.toastr.success("Successfully registered!", "Success");
        this.router.navigate(["/user/login"]);
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  signIn(email: string, password: string) {
    this.dbAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.router.navigate(["/home"]);
        localStorage.setItem('email', data.user.email);
        this.toastr.success("Successfully logged in!", "Success");
        this.initializeAuthState();
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  pushUserData(user: { uid?: string, username: string, email: string, gender: string, phone: string, profilePicture: string, role: string }) {
    user.uid = this.getUserId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.firestore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      profilePicture: user.profilePicture,
      role: user.role,
    };
    return userRef.set(data);
  }

  getUser(id: string): Observable<IUser> {
    const userDocuments = this.firestore.doc<IUser>('users/' + id);
    return userDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          return { ...data };
        }))
  }

  // logout() {
  //   this.dbAuth.auth.signOut()
  //     .then(() => {
  //       localStorage.clear();
  //       this.router.navigate(["/home"]);
  //       // this.toastr.success("Successfully logged out!", "Success");
  //       location.reload();
  //     })
  //     .catch(err => {
  //       // this.toastr.error(err, "Error");
  //     });
  // }

  getUserId() {
    if (this.dbAuth.auth.currentUser) {
      return this.dbAuth.auth.currentUser.uid;
    } else {
      this.router.navigate(['/home']);
      return null;
    }
  }
}