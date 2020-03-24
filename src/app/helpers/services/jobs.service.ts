import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IJob } from '../interfaces/IJob';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobsCollection: AngularFirestoreCollection<IJob>;
  constructor(private firestore: AngularFirestore, private toastr: ToastrService, private userService: UserService, private router: Router) {
    this.jobsCollection = this.firestore.collection('jobs');
  }

  createJob(allSkills: {}, jobPosition: string, salary: number, jobCategory: string, degree: string, englishLevel: string, advantages: string, authorId: string, authorName: string) {
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
    }

    this.jobsCollection.add(newJob).then(() => {
      this.toastr.success("Successfully created job!", "Success");
      this.router.navigate(['/home']);
    }).catch(err => {
      this.toastr.error(err, "Error");
    })
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
}
