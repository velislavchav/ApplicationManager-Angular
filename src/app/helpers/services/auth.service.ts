import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthChanged = new Subject<boolean>();
  constructor(private firestore: AngularFirestore,
    private dbAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) { }

  get isAuth() {
    return localStorage.getItem('usrrole');
  }

  initializeAuthState() {
    this.dbAuth.authState.subscribe(() => {
      if (!!localStorage.getItem('usrrole')) {
        this.isAuthChanged.next(true);
      } else {
        this.isAuthChanged.next(false);
      }
    });
  }

  signIn(email: string, password: string) {
    this.dbAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.getUser(data.user.uid).pipe(
          take(1)
        ).subscribe(userData => {
          this.router.navigate(["/home"]);
          localStorage.setItem('usrrole', btoa(userData.role));
          this.toastr.success("Successfully logged in!", "Success");
          this.initializeAuthState();
        })
      })
      .catch(err => {
        this.toastr.error(err, "Error");
      });
  }

  getUser(id: string): Observable<any> {
    const userDocuments = this.firestore.doc<any>('users/' + id);
    return userDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          return { ...data };
        }))
  }

  getUserId() {
    if (this.dbAuth.auth.currentUser) {
      return this.dbAuth.auth.currentUser.uid;
    } else {
      this.router.navigate(['/home']);
      return null;
    }
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
}
