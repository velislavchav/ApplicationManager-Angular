import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IEmployer } from '../interfaces/IEmployer';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  constructor(private firestore: AngularFirestore,
    private dbAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) { }

  signUp(name: string, email: string, password: string, phone: string, logo: string,
    moreInfo: string) {
    this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.pushEmployerDataAfterRegister({ name, email, phone, logo, moreInfo });
        this.toastr.success("Successfully registered employer!", "Success");
        this.router.navigate(["/user/login"]);
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  pushEmployerDataAfterRegister(employer: IEmployer) {
    employer.eid = this.authService.getUserId();
    // Sets employer data to firestore on login
    const userRef: AngularFirestoreDocument<IEmployer> = this.firestore.doc(`users/${employer.eid}`);
    const data = {
      eid: employer.eid,
      name: employer.name,
      email: employer.email,
      role: 'employer',
      phone: employer.phone,
      logo: employer.logo,
      moreInfo: employer.moreInfo,
      applicationsSubmitted: [],
      jobsPositions: [],
    };
    userRef.set(data);
  }

  updateLogo(logoUrl: string) {
    const employerId = this.authService.getUserId();
    this.authService.getUser(employerId) // update the employer
      .pipe(take(1))
      .toPromise().then(data => {
        let employerData = data as IEmployer;
        employerData.logo = logoUrl;
        this.firestore.collection("users").doc(employerId).set(employerData);
        this.toastr.success('Successfully updated logo', 'Success');
      }).catch(err => {
        this.toastr.error(err, 'Error');
      });
  }

  getApplications(userId: string) {
    return this.authService.getUser(userId).pipe(take(1), map(usrData => {
      const applications = usrData.applicationsSubmitted;
      return applications;
    }))
  }

  rejectApplication(rejectedApplication: Object) {
    
  }
}
