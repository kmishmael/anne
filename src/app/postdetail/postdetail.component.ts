import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../article';
import { Article } from '../article.model';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit, OnDestroy {
  post: Article;
  id: string;
  path: string;
  late: Post;

  constructor(private route: ActivatedRoute, private location: Location, private postService: PostService) { }

  ngOnInit(): void {
    this.getPost();
    
  }

  getPost(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    var post = this.postService.getPost(this.id).subscribe(post => {
      this.post = {
          id: post.payload.id,
          ...post.payload.data() as Article,
        };
    console.log(post);
  })
  }

  goBack(): void{
    this.location.back();
  }

  ngOnDestroy(): void {}

}
