import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IEmployer } from '../interfaces/IEmployer';
import { AuthService } from './auth.service';

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
}
