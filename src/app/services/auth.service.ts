import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // usersRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  // userRef: AngularFireObject<any>;     // Reference to user object, Its an Observable too
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        const getUser = JSON.parse(localStorage.getItem('user') || '{}');
        return getUser;
      } else {
        localStorage.setItem('user', '{}');
        const getUser = JSON.parse(localStorage.getItem('user') || '{}');
        return getUser;
      }
    });
  }

  login(credentials: IUser) {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  register(newUser: IUser) {
    return this.afAuth.createUserWithEmailAndPassword(newUser.email, newUser.password);
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/home']);
    });
  }
}
