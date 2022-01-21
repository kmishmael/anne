import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../article';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';

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
  get_article$: any;

  constructor(private route: ActivatedRoute, private location: Location, private postService: PostService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.id = this.getId();
    this.getPost();
    
  }
  getId(): string{
    return this.route.snapshot.paramMap.get('id')
  }


  getPost(): void{
    this.id = this.getId();
    this.get_article$ = this.postService.getArticle(this.id).subscribe({
      next: post => {
        this.post = post;
      },
      error: e => {
        console.log(e);
      }
    })
  }

  deletePost(id: string){
    this.dialog.closeAll();
    this.postService.deleteArticle(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.location.back();
      }
    });

  }

  openDialog() {
    this.dialog
    this.dialog.open(optionsubComponent, {data: this.id});
  }
  
  goBack(): void{
    this.location.back();
  }

  ngOnDestroy(): void {
    console.log("component shut down");
    this.get_article$.unsubscribe();
  }

}

@Component({
  selector: 'post-sub-options',
  templateUrl: 'dialog.snippet.html'
})
export class optionsubComponent {
  @Input() id: string;

  constructor(private route: ActivatedRoute, private postService: PostService, public dialog: MatDialog,
    private postdetailComponent: PostdetailComponent, @Inject(MAT_DIALOG_DATA)public post_id: any){}

  deletePost(){
    this.postdetailComponent.deletePost(this.post_id);
  }
}