import { Component, OnInit } from '@angular/core';
import { Post } from '../article';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from '../article.model';

@Component({
  selector: 'app-tagposts',
  templateUrl: './tagposts.component.html',
  styleUrls: ['./tagposts.component.css']
})
export class TechnologyComponent implements OnInit {

  posts: Post[];
  category: any;
  page:number = 1;
  tags: Post[];

  constructor(private postService: PostService, private route: ActivatedRoute, private location: Location) { 
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')
      this.ngOnInit();
  });
  }

  goBack(){
    this.location.back();
  }
  
  ngOnInit(): void {
    this.getPosts();
    this.test();
  }

  getPosts(): void{
    //const category = this.route.snapshot.paramMap.get('category');
    const category = this.category;
    this.postService.getPostsOfCategory().subscribe(posts => {
      this.posts = posts.map(e => {
        return{
          id: e.payload.doc.id,
          title: e.payload.doc.get('title'),
          author: e.payload.doc.get('author'),
          category: e.payload.doc.get('category'),
          content: e.payload.doc.get('content'),
          date: e.payload.doc.get('date'),
        }as Article
      }).filter(doc => doc.category == category)
    });
  //  this.tags = this.posts.filter(post => post.category === 'tech');
    //console.log(this.posts)
  }

  test(): void{
    console.log(this.posts)
  }

  }
