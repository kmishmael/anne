import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../article';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit, OnDestroy {
  post: Post;
  id: string;
  path: string;
  late: Post;

  constructor(private route: ActivatedRoute, private location: Location, private postService: PostService) { }

  ngOnInit(): void {
    //this.path = this.route.snapshot.url.join('/');
   // this.getPost();
    
  }
/*
  getPost(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(this.id).subscribe(post => this.post = post);
  }

  getLatestPost(): void{
    this.postService.getLatestPost().subscribe(post => this.late = post);
  }
*/
  goBack(): void{
    this.location.back();
  }

  ngOnDestroy(): void {}

}
