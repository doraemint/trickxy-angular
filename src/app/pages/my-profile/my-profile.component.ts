import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  myProfileData: any;
  picProfile: any;
  isEditingPic: boolean = false;
  myData: any = [];

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  filePath: string;

  updatePicProfile: any

  constructor(public userService: UserService,
    private uploadService: FileUploadService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router) {
    // this.updatePicProfile = this.userService.userDataEditPic;
    // console.log('this.updatePicProfile', this.updatePicProfile);
  }

  ngOnInit(): void {
    let getUpdatePic: any;
    this.userService.getUpdatePicProfileObs().subscribe(data => getUpdatePic = JSON.stringify(data));
    this.updatePicProfile = JSON.parse(getUpdatePic)
    this.getMyProfileDetail();
  }

  getMyProfileDetail() {
    if (this.updatePicProfile) {
      this.myProfileData = this.updatePicProfile;
      this.picProfile = this.updatePicProfile.photoURL;
    }
    else {
      this.myProfileData = this.userService.getMyProfile();
      this.picProfile = this.myProfileData.photoURL
    }
  }

  editPicProfile() {
    this.isEditingPic = true;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.prepareUpload();
  }
  previewImg(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.picProfile = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  prepareUpload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined!;
    this.currentFileUpload = new FileUpload(file!);
    this.previewImg(file);
  }

  uploadToDb() {
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe((
      percentage) => {
      this.percentage = Math.round(percentage!);
      console.log('percentage', percentage)
      // if (this.percentage === 100) {
      //   console.log('percentage ifff', percentage)
      //   this.userService.updatePicProfile();
      //   return;
      // }
    },
      error => {
        console.log(error);
      }
    );
  }
  submitEditPic() {
    this.uploadToDb();
    setTimeout(() => {
      this.userService.updatePicProfile();
    }, 10000);
    setTimeout(() => {
      this.reloadCurrentRoute();
    }, 15000)
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
}
