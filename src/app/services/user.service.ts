import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public picUrl = new BehaviorSubject<String>('');
  public userDataEditPic = new BehaviorSubject<String>('');
  constructor(public afs: AngularFirestore,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private fileUploadService: FileUploadService,
    public authService: AuthService) {
    this.userDataEditPic.next('');
  }

  getMyProfile() {
    const getMyProfile = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('getMyProfile', getMyProfile);
    return getMyProfile;
  }

  public updatePicProfile() {
    let urlPic = this.fileUploadService.getImgUrlFromStorage();
    localStorage.removeItem('test')
    let data: any = {};
    console.log('updatePicProfile', urlPic)
    return this.afAuth.currentUser.then((user) => {
      user!.updateProfile({
        photoURL: urlPic
      });
      localStorage.removeItem('user')
    }).then(() => {
      console.log('ddd', data)
      this.db.object('users/' + data!.uid).update({ photoURL: urlPic });
    }).finally(() => {
      this.afAuth.authState.subscribe(user => {
        data = user;
        console.log('afAuth', user);
        this.userDataEditPic.next(data);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('test', JSON.stringify(user!.photoURL));
      });
    })
    // }).finally(()=>{
    //   location.reload();
    // })
  }

  getUpdatePicProfileObs(): Observable<any> {
    return this.userDataEditPic.asObservable();
  }
}
