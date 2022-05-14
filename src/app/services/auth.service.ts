import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import * as firebase from 'firebase'
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  userRef: AngularFireObject<any>;     // Reference to user object, Its an Observable too
  userData: any;
  isLogin: boolean = false;
  userUid: any = null;
  uid : any;
  private basePath = '/users';
  public isLoginStatus = new BehaviorSubject<String>('');
  constructor(
    public afs: AngularFirestore,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.isLoginStatus.next('');
    this.setDataToLocalStorage();
  }

  login(credentials: IUser) {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then((userCredential) => {
      this.isLoginStatus.next('true');
    });
  }

  private saveUserData(newUser: IUser): void {
    this.afAuth.authState.subscribe(user => {
      this.db.object('users/' + user!.uid).update(newUser);
    });
  }

  register(newUser: IUser) {
    return this.afAuth.createUserWithEmailAndPassword(newUser.email, newUser.password,).then((userCredential) => {
      const user = userCredential.user;
      console.log('register',user)

      newUser.displayName = '@' + newUser.displayName;
      newUser.photoURL = 'https://firebasestorage.googleapis.com/v0/b/trickxy-official.appspot.com/o/uploads%2Fuser.png?alt=media&token=07eb84b1-6992-4797-b8dc-3fa81fbe606e';
      this.afAuth.currentUser.then((user) => {
        user!.updateProfile({
          displayName: newUser.displayName,
          photoURL: newUser.photoURL
        });
        this.saveUserData(newUser);
      });
    });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/']);
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    });
  }

  setDataToLocalStorage() {
    console.log('aa');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isLogin = true;
        localStorage.setItem('isLogin', JSON.stringify(this.isLogin));
        this.userUid = user.uid;
      } else {
        localStorage.setItem('user', '{}');
        this.isLogin = false;
        localStorage.setItem('isLogin', JSON.stringify(this.isLogin));
      }
    });
    return this.getDataFromLocalStorage()
  }

  getDataFromLocalStorage() {
    const getUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isLogin = JSON.parse(localStorage.getItem('isLogin') || '{}');
    return { getUser, isLogin };
  }

  getCurrentUid() {
    return this.uid;
  }

}
