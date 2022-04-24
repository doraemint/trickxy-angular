import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  myProfileData: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getMyProfileDetail();
  }

  getMyProfileDetail() {
    this.myProfileData = this.userService.getMyProfile()
    console.log('myProfileData',this.myProfileData)
  }



}
