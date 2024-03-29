import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../article';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit, OnDestroy {

  posts: Post[];
  routeUrl: string;

  selectedPost: Post;

  buttonCreate: boolean = false;
  buttonEdit: boolean = false;
  buttonPublish: boolean = false;

  // local routes params
  // subscription to allow us to unsubscribe at the end of the component lifecycle. Avoid Memory Leakage.
  articles$: Subscription; 
  pageSize: number = 12;
  pageNumber: number = 1;
  numOfPages: number;

  isLoggedIn: boolean = false;


  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private authService: AuthService){ }

  ngOnInit(): void {
    if (this.router.url == '/articles') {
      this.router.navigate(['/articles'], {queryParams: {page: this.pageNumber, size: this.pageSize}} )
    }

    this.authService.getUser();
    this.isLoggedIn = this.authService.isLoggedIn;

    this.getArticles();
  }

  getQueryParams(): void{
    this.route.queryParamMap.subscribe({
      next: (params) => {

          this.pageNumber = parseInt(params.get('page') || '1');
          this.pageSize = parseInt(params.get('size') || '12');
      }
      
    })
  }
  getParams(): HttpParams{
    return new HttpParams().set('page', this.pageNumber).set('size', this.pageSize)
  } 
  
  getArticles(): void{
    //this.getQueryParams();
    const params = this.getParams();
  
    this.articles$ = this.postService.getArticles(params).subscribe({
      next: (data) => {
        this.posts = data.payload;
        this.numOfPages = data.pages;
      }
    });
  }
  
  getNextPage(): void{
    this.posts = [];
    if (this.pageNumber >= this.numOfPages){
      this.pageNumber;
    }
    else{
      this.pageNumber++; // increment by one page
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.router.navigate(['/articles'], {queryParams: {page: this.pageNumber, size: this.pageSize}});
    this.getArticles();
  }
  /** TODO
   * Add for navigation to a specific user-defined page.
   */

  getPrevPage(): void{
    this.posts = [];
    if (this.pageNumber <= 1){
      this.pageNumber;
    } 
    else{
      this.pageNumber--;
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.router.navigate(['/articles'], {queryParams: {page: this.pageNumber, size: this.pageSize}})
    this.getArticles();
  }
  selectPost(post: Post): Post{
    this.selectedPost = post;
    return this.selectedPost
  }

  ngOnDestroy(): void {
    this.articles$.unsubscribe();   // Unsubscribe the Observable.
  }

}
