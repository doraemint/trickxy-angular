import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  myProfileData: any;
  isLogin: boolean;
  isLoginStatus: any;
  constructor(private userService: UserService, private authService: AuthService) {
    this.isLoginStatus = this.authService.isLoginStatus;
   }

  ngOnInit(): void {
    this.getMyProfileDetail();
  }

  getMyProfileDetail() {
    this.myProfileData = this.userService.getMyProfile();
    this.isLogin = JSON.parse(localStorage.getItem('isLogin') || '{}');
  }

  logout() {
    this.authService.logout();
  }

}
