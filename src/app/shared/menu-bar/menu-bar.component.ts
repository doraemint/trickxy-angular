import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  dataFirstLogin: any;
  unsubscribe$: Subject<boolean> = new Subject();
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.isLoginStatus = this.authService.isLoginStatus;
  }

  ngOnInit() {
    this.getDataFirstLogin();
  }

  getDataFirstLogin() {
    let getDataFirstLogin: any;
    let rawDataFirstLogin: any;
    this.authService.getUserObs().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      getDataFirstLogin = JSON.stringify(data);
      this.dataFirstLogin = JSON.parse(getDataFirstLogin)
      this.getMyProfileDetail();
    });
  }


  getMyProfileDetail() {
    if (this.dataFirstLogin) {
    console.log('dataFirstLogin', this.dataFirstLogin)
      this.myProfileData = this.dataFirstLogin;
      this.isLogin = JSON.parse(localStorage.getItem('isLogin') || '{}');
    }
    else {
    this.myProfileData = this.userService.getMyProfile();
    this.isLogin = JSON.parse(localStorage.getItem('isLogin') || '{}');
    }
  }

  logout() {
    this.authService.logout();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
