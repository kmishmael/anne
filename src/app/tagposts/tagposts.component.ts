import { Component, OnInit } from '@angular/core';
import { Post } from '../article';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tagposts',
  templateUrl: './tagposts.component.html',
  styleUrls: ['./tagposts.component.css']
})
export class TechnologyComponent implements OnInit {

  posts: Post[];
  category: any;
  page:number = 1;

  constructor(private postService: PostService, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')
      this.ngOnInit();
  });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void{
    //const category = this.route.snapshot.paramMap.get('category');
    const category = this.category;
    this.postService.getPostsOfCategory(category).subscribe(posts => this.posts = posts);
  }

  }
