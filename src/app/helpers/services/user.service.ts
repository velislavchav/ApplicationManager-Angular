import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore,
    private dbAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  signUp(username: string, email: string, password: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.pushUserDataAfterRegister({ username, email });
        this.toastr.success("Successfully registered user!", "Success");
        this.router.navigate(["/user/login"]);
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  pushUserDataAfterRegister(user: { uid?: string, username: string, email: string }) {
    user.uid = this.authService.getUserId();
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
    newDataForUser.role = 'user';
    newDataForUser.uid = this.authService.getUserId();
    const userRef: AngularFirestoreDocument<IUser> = this.firestore.doc(`users/${newDataForUser.uid}`);
    userRef.set(newDataForUser).then(() => {
      this.toastr.success("Successfully edited profile!", "Success");
      this.router.navigate(["/user/profile"]);
    }).catch(err => {
      this.toastr.error(err, "Error");
      this.router.navigate(["/home"]);
    });
    
  }
}