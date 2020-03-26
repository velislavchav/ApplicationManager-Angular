import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IJob } from '../interfaces/IJob';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IEmployer } from '../interfaces/IEmployer';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobsCollection: AngularFirestoreCollection<IJob>;
  constructor(private firestore: AngularFirestore, private toastr: ToastrService, private router: Router, private authService: AuthService) {
    this.jobsCollection = this.firestore.collection('jobs');
  }

  createJob(allSkills: {}, jobPosition: string, salary: number, jobCategory: string, degree: string, englishLevel: string, advantages: string, authorId: string, authorName: string) {
    const createdAt = this.getCreatedDate();
    let requiredSkills: Array<string> = [];
    for (const selectedSkill in allSkills) {
      if (allSkills[selectedSkill]) {
        requiredSkills.push(selectedSkill);
      }
    } // filtering all skills to only required

    const newJob = {
      requiredSkills,
      jobPosition,
      salary,
      jobCategory,
      degree,
      englishLevel,
      advantages,
      authorId,
      authorName,
      createdAt,
    }

    this.jobsCollection.add(newJob)
    .then(firestoreData => {
      newJob['id'] = firestoreData.id;
      this.firestore.doc(`jobs/${firestoreData.id}`).set(newJob); // add again new job, because previous one doesnt have id
      this.authService.getUser(authorId) // add the new job in employer
        .pipe(take(1))
        .toPromise().then(data => {
          let employerData = data as IEmployer;
          let newEmployerJobs = data.jobsPositions.slice();
          newEmployerJobs.push(newJob);
          employerData['jobsPositions'] = newEmployerJobs; // add job position object 
          this.firestore.collection("users").doc(authorId).set(employerData);
          this.toastr.success("Successfully created job!", "Success");
          this.router.navigate(['/home']);
        });
    }).catch(err => {
      this.toastr.error(err, "Error");
    })
  }

  loadJob(jobId: string) {
    const userDocuments = this.firestore.doc<any>('jobs/' + jobId);
    return userDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as IJob;
          return { ...data };
        }))
  }

  loadJobs() {
    return this.firestore.collection('jobs').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IJob;
          data.id = a.payload.doc.id;
          return data;
        })
      }),
    )
  }

  loadJobDetails(jobId: string) {
    return this.firestore.collection('jobs').doc(jobId).ref.get()
      .then(doc => {
        return doc.data() as IJob;
      });
  }

  getCreatedDate() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return today = dd + '/' + mm + '/' + yyyy;
  }

  loadOwnedJobs(userId: string) {
    return this.firestore.collection('jobs').snapshotChanges().pipe(
      map(changes => {
        return changes.map(job => {
          const data = job.payload.doc.data() as IJob;
          data.id = job.payload.doc.id;
          if (data.authorId === userId) {
            return data;
          }
        })
      }),
    )
  }
}
