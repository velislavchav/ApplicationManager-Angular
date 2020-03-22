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

  signUp(username: string, email: string, password: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.pushUserDataAfterRegister({ username, email });
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

  pushUserDataAfterRegister(user: { uid?: string, username: string, email: string }) {
    user.uid = this.getUserId();
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.firestore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      profilePicture: 'https://i.ytimg.com/vi/eDBDthVSiS8/maxresdefault.jpg',
      role: 'user',
      gender: 'Choose gender',
      phone: '',
      availability: 'Choose availability',
      profession: 'Select profession',
      experience: 'Select experience',
      preferedWayOfCommunication: 'Prefered way of communication',
      englishLevel: 'English level',
      totalProjects: 0,
      projectsLink: '',
      moreInfo: '',
      techSkills: {
        javascript: false,
        cSharp: false,
        java: false,
        python: false,
        php: false,
        wordpress: false,
        mySql: false,
        mongoDb: false,
        expressJs: false,
        reactJs: false,
        angular: false,
        vue: false,
        nodeJs: false,
        reactNative: false,
        autoCAD: false,
        firebase: false,
      },
      applications: [],
    };
    userRef.set(data);
  }

  updateUserData(newDataForUser) {
    newDataForUser.uid = this.getUserId();
    const userRef: AngularFirestoreDocument<IUser> = this.firestore.doc(`users/${newDataForUser.uid}`);
    userRef.set(newDataForUser).then(() => {
      this.toastr.success("Successfully edited profile!", "Success");
      this.router.navigate(["/user/profile"]);
    }).catch(err => {
      this.toastr.error(err, "Error");
      this.router.navigate(["/home"]);
    });
    
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

  logout() {
    return this.dbAuth.auth.signOut()
      .then(() => {
        localStorage.clear();
        this.router.navigate(["/home"]);
        this.toastr.success("Successfully logged out!", "Success");
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  getUserId() {
    if (this.dbAuth.auth.currentUser) {
      return this.dbAuth.auth.currentUser.uid;
    } else {
      this.router.navigate(['/home']);
      return null;
    }
  }
}