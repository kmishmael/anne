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
  sub;
  constructor(private route: ActivatedRoute, private location: Location, private postService: PostService) { }

  ngOnInit(): void {
   this.getPost();
  }

  rungetPost():void{
    this.getPost();
  }

  getPost(): void{
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.sub = this.postService.getPost(id).subscribe(post => this.post = post);
    this.sub;
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
