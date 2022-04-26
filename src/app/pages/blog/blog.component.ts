import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/models/blog';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  allBlog: IBlog[] = [];
  myData: any;
  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getAllBlog();
    this.myData = this.authService.getDataFromLocalStorage();
  }

  getAllBlog() {
    this.blogService.getAllBlog().subscribe((data) => {
      this.allBlog = data;
      console.log(this.allBlog)
    });
    //
  }
  goToCreatePost() {
    this.router.navigate(['/create-edit-blog'])
  }
}
