import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../article';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  post: Post;
  constructor(private route: ActivatedRoute, private location: Location, private postService: PostService) { }

  ngOnInit(): void {
   this.getPost();
  }

  getPost(): void{
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.postService.getPost(id).subscribe(post => this.post = post);
  }

}
