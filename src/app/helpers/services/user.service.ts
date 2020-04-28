import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';
import { IJob } from '../interfaces/IJob';
import { IEmployer } from '../interfaces/IEmployer';

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
      applicationsId: [],
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

  addApplication(job: IJob, user: IUser) {
    this.authService.getUser(job.authorId).pipe(take(1)).toPromise().then(employer => {
      this.addApplicationInUser(job, user);
      this.addApplicationInEmployer(job, user, employer);
      this.toastr.success('Successfully sent application', 'Success');
    }).catch(err => {
      this.toastr.error(err, 'Error');
    });
  }

  private addApplicationInUser(application: IJob, userData: IUser) {
    let user = JSON.parse(JSON.stringify(userData)); // clone the props
    let newUserApplicationsId = user.applicationsId.slice();
    newUserApplicationsId.push(application.id);
    userData['applicationsId'] = newUserApplicationsId; // add application id 

    let newUserApplications = user.applications.slice();
    newUserApplications.push(application);
    userData['applications'] = newUserApplications; // add application object

    this.firestore.collection("users").doc(user.uid).set(userData); //push the new user data
  }

  private addApplicationInEmployer(jobApplication: IJob, user: IUser, employer: IEmployer) {
    let employerData = JSON.parse(JSON.stringify(employer)); // clone the props
    let employerApplications = employer.applicationsSubmitted.slice();
    let senderInfo = {
      uid: user.uid,
      availability: user.availability,
      email:user.email,
      englishLevel: user.englishLevel,
      experience: user.experience,
      gender: user.gender,
      moreInfo: user.moreInfo,
      phone: user.phone,
      preferedWayOfCommunication: user.preferedWayOfCommunication,
      profession: user.profession,
      profilePicture: user.profilePicture,
      techSkills: user.techSkills,
      projectsLink: user.projectsLink,
      totalProjects: user.totalProjects

    }
    const employerSubmittedApplications = {
      jobInfo: jobApplication,
      senderInfo,
    }

    employerApplications.push(employerSubmittedApplications);
    employerData['applicationsSubmitted'] = employerApplications; // add application in employer
    this.firestore.collection("users").doc(employerData.eid).set(employerData);
  }

  removeApplication(job: IJob, user: IUser) {
    let notificationMessage = 'Success';
    atob(localStorage.getItem('usrrole')) === 'employer' ?
      notificationMessage = 'Successfully rejected application' :
      notificationMessage = 'Successfully canceled application'

    this.authService.getUser(job.authorId).pipe(take(1)).toPromise().then(employer => {
      this.removeApplicationInUser(job, user);
      this.removeApplicationInEmployer(job, user, employer);
      this.toastr.success(notificationMessage, 'Success');
      this.router.navigate(['/home']);
    }).catch(err => {
      this.toastr.error(err, 'Error');
    });
  }

  private removeApplicationInUser(job: IJob, user: IUser) {
    let userData = JSON.parse(JSON.stringify(user)); // clone the props
    let newUserApplicationsId = userData.applicationsId.slice();
    const appIdIndex = newUserApplicationsId.findIndex(x => x === job.id);
    if (appIdIndex >= 0) {
      newUserApplicationsId.splice(appIdIndex, 1)
      userData['applicationsId'] = newUserApplicationsId;
    }

    // delete the application 
    let newUserApplications = userData.applications.slice();
    const appIndex = newUserApplications.findIndex(x => x.id === job.id);
    if (appIdIndex >= 0) {
      newUserApplications.splice(appIndex, 1);
      userData['applications'] = newUserApplications;
    }

    this.firestore.collection("users").doc(userData.uid).set(userData);
  }

  private removeApplicationInEmployer(job: IJob, user: IUser, employer: IEmployer) {
    let employerData = JSON.parse(JSON.stringify(employer)); // clone the props
    let employerApplications = employerData.applicationsSubmitted.slice();
    const jobIndex = employerApplications.findIndex(arrEl => arrEl.jobInfo.id === job.id && arrEl.senderInfo.uid === user.uid);
    if (jobIndex >= 0) {
      employerApplications.splice(jobIndex, 1); // remove the application
      employerData['applicationsSubmitted'] = employerApplications; //
      this.firestore.collection("users").doc(employerData.eid).set(employerData);;
    }
  }


  isUserApplicationExist(applications: Array<IJob>, neededApplicationId: string) {
    let isExist = false;
    for (const application of applications) {
      if (application.id === neededApplicationId) {
        isExist = true;
      }
    }
    return isExist;
  }
}