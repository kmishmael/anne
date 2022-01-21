import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../article';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {

  posts: Post[];
  page: number = 1;
  size: number = 12; 
  routeUrl: string;
  
 
  
  numOfPages: number;
  selectedPost: Post;

  buttonCreate: boolean = false;
  buttonEdit: boolean = false;
  buttonPublish: boolean = false;

 // lastVisible: Post[] =[];

  constructor(private postService: PostService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.getArticles();
    
  }

  getParams(): HttpParams{
    return new HttpParams().set('page', this.page).set('size', this.size)
  } 
  
  getArticles(): void{
    const params = this.getParams();
    this.postService.getArticles(params).subscribe(posts =>{
      this.posts = posts.payload;
      this.numOfPages = posts.pages;
    })
  }
  
  getNextPage(): void{
    this.posts = [];
    if (this.page >= this.numOfPages){
      this.page;
    }
    else{
      this.page++;
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.getArticles();
  }

  getPrevPage(): void{
    if (this.page <= 1){
      this.page;
    } 
    else{
      this.page--;
    }
    this.getArticles();
  }
  selectPost(post: Post): Post{
    this.selectedPost = post;
    return this.selectedPost
  }
}
