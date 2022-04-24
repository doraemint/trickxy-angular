import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getMyProfile(){
    const getMyProfile = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('getMyProfile',getMyProfile);
    return getMyProfile;


  }
}
