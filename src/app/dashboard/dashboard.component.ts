import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { Post, Num } from '../article';
import { ActivatedRoute } from '@angular/router';
import * as PostJson from '../../assets/json/bbc-articles.json';
import { Article } from '../article.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {

  posts: Article[];
  page:number = 1;
  routeUrl: string;
  
  pos: Article[];
 
  pageNumber: number = 1;
  numOfPages: number;
  selectedPost: Post;

  buttonCreate: boolean = false;
  buttonEdit: boolean = false;
  buttonPublish: boolean = false;

 // lastVisible: Post[] =[];

  constructor(private postService: PostService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.getNextPage();

   //this.numOfPages = this.num
  }

  // Get the number of articles

  //get the articles for home page
  getArticles(): void{
    this.postService.getArticles().subscribe(posts => {
      this.posts = posts.map(e => {
        return{
          id: e.payload.doc.id,
          title: e.payload.doc.get('title'),
          author: e.payload.doc.get('author'),
          category: e.payload.doc.get('category'),
          content: e.payload.doc.get('content'),
          date: e.payload.doc.get('date'),
        }as Article
      })
    });
  }

  getNext(): void{
    this.postService.getArticles().subscribe(posts => {
      this.posts = posts.map(e => {
        return{
          id: e.payload.doc.id,
          title: e.payload.doc.get('title'),
          author: e.payload.doc.get('author'),
          category: e.payload.doc.get('category'),
          content: e.payload.doc.get('content'),
          date: e.payload.doc.get('date'),
        }as Article
      })
    });
  }

  
  getNextPage(): any{
    this.pageNumber++;
    this.postService.getNextPage(this.posts).subscribe(posts => {
      this.posts = posts.map(e => {
        return{
          id: e.payload.doc.id,
          title: e.payload.doc.get('title'),
          author: e.payload.doc.get('author'),
          category: e.payload.doc.get('category'),
          content: e.payload.doc.get('content'),
          date: e.payload.doc.get('date'),
        }as Article
      })
    });
  }
  /*
  
  }*/
  //return selected post

   
  selectPost(post: Post): Post{
    this.selectedPost = post;
    return this.selectedPost
  }
}
