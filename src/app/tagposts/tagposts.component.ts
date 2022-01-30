import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../article';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tagposts',
  templateUrl: './tagposts.component.html',
  styleUrls: ['./tagposts.component.css']
})
export class TechnologyComponent implements OnInit, OnDestroy {

  posts: Post[];
  category: any;
  page:number = 1;
  tags: Post[];
  articles$: Subscription;

  // local route params
  pageSize: number = 12;
  pageNumber: number = 1;
  numOfPages: number;

  isLoggedIn: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute, private location: Location, private router: Router,
    private authService: AuthService) { 
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')
  });
  }
  
  ngOnInit(): void {

    if (this.router.url == `/category/${this.category}`){
      
      this.router.navigate([`/category/${this.category}`], {queryParams: {page: this.pageNumber, size: this.pageSize}});
   
    }
    
    this.authService.getUser();
    this.isLoggedIn = this.authService.isLoggedIn;

    this.getArticles();
  }

  goBack(){
    this.location.back();
  }

  getQueryParams(): void{
    this.route.queryParamMap.subscribe({
      next: (params) => {

        this.pageNumber = parseInt(params.get('page'));
        this.pageSize = parseInt(params.get('size'));
        
      }      
    })
  }

  getParams(): HttpParams{
    return new HttpParams().set('page', this.pageNumber).set('size', this.pageSize)
  }

  getArticles(): void{

    const category = this.category;
    const params = this.getParams();
  
    this.articles$ = this.postService.getTaggedPosts(category, params).subscribe({
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
      this.pageNumber++;
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.router.navigate([`category/${this.category}`], {queryParams: {page: this.pageNumber, size: this.pageSize}});
    this.getArticles();
  }

  getPrevPage(): void{
    this.posts = [];
    if (this.pageNumber <= 1){
      this.pageNumber;
    } 
    else{
      this.pageNumber--;
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.router.navigate([`category/${this.category}`], {queryParams: {page: this.pageNumber, size: this.pageSize}})
    this.getArticles();
  }

  ngOnDestroy(): void {
    this.articles$.unsubscribe();
  }

  }
