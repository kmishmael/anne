import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post, Num } from '../article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [];
  page:number = 1;
  routeUrl: string;
 
  pageNum: number;
  numOfPages: number;
  selectedPost: Post;

  buttonCreate: boolean = false;
  buttonEdit: boolean = false;
  buttonPublish: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.getArticles();

   //this.numOfPages = this.num
  }

  // Get the number of articles

  //get the articles for home page
  getArticles(): void{
    this.postService.getArticles().subscribe(posts => this.posts = posts);
  }
  /*
  getButton(): void {
    this.routeUrl = this.route.snapshot.url.join('/');
    if (this.routeUrl === 'dashboard'){
      this.buttonCreate = true;
    }else
       if(this.routeUrl === 'category/tech'){
         this.buttonCreate = true;
      }else
      if(this.routeUrl === 'category/sport'){
        this.buttonCreate = true;
     }else
     if(this.routeUrl === 'category/entertainmen'){
       this.buttonCreate = true;
    }else
    if(this.routeUrl === 'category/tech'){
      this.buttonCreate = true;
   }
    }
  }*/
  //return selected post

  selectPost(post: Post): Post{
    this.selectedPost = post;
    return this.selectedPost
  }
}
