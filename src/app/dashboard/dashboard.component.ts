import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post, Num } from '../article';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [];
  num: Num[];
 // num;
  pageNum: number;
  numOfPages: number;
  selectedPost: Post;

  constructor(private postService: PostService){
   }

  ngOnInit(): void {
    this.getArticles();
    this.getNumArticles();

   //this.numOfPages = this.num
  }

  // Get the number of articles
  getNumArticles(): void{
    this.postService.getNum().subscribe(num => this.num = num)
  }

  //get the articles for home page
  getArticles(): void{
    this.postService.getArticles().subscribe(posts => this.posts = posts);
  }
  
  //return selected post

  selectPost(post: Post): Post{
    this.selectedPost = post;
    return this.selectedPost
  }
}
