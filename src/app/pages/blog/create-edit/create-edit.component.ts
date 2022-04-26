import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/models/blog';
import { FileUpload } from 'src/app/models/file-upload';
import { BlogService } from 'src/app/services/blog.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-create-edit-blog',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditBlogComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  blogForm: FormGroup;

  filePath: string;
  data: IBlog = {
    key: '',
    title: '',
    description: '',
    fileUpload: '',
    authorKey: '',
    authorName: '',
    authorImgUrl: '',
  }

  myData: any;
  uploading: boolean = false;

  constructor(
    private uploadService: FileUploadService,
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      fileUpload: ['', Validators.required],
      authorKey: [''],
      authorName: [''],
      authorImgUrl: ['']
    });
  }
  ngOnInit(): void {
    this.myData = JSON.parse(localStorage.getItem('user') || '{}');
    this.blogForm.get('authorKey')?.patchValue(this.myData.uid);
    this.blogForm.get('authorName')?.patchValue(this.myData.displayName);
    this.blogForm.get('authorImgUrl')?.patchValue(this.myData.photoURL);

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.prepareUpload();
  }

  previewImg(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
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
    this.data = {
      ...this.blogForm.value
    }

    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe((
      percentage) => {
      this.percentage = Math.round(percentage!);
      console.log('percentage', percentage)
    },
      error => {
        console.log(error);
      }
    );

  }

  submit() {
    this.uploadToDb();
    this.uploading = true;
    console.log('form', this.blogForm.value)
    setTimeout(() => {
      this.blogService.createNewBlog(this.data).then((res: any) => {
        console.log('create blog', res);
        this.router.navigate(['/blog']);
      });
    }, 2000)


  }
}
