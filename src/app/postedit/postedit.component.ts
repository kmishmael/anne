import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Post } from '../article';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../post.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article.model';
import { CommentsComponent } from '../comments/comments.component';


@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrls: ['./postedit.component.css']
})
export class PosteditComponent implements OnInit {

  post: Post;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  id: string;
  postForm: FormGroup;
  data:any;
  rawForm: any;
  latest_id: string;
  

  constructor(private httpClient: HttpClient, private postService: PostService, private route: ActivatedRoute,
    private location: Location, private commentsCoponent: CommentsComponent ) { }

  goBack():void{
    this.location.back();
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode){

      this.postService.getArticle(this.id)
      .subscribe(post => {
        this.postForm.patchValue(post);
      })
    }

    this.postForm = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      content: new FormControl(''),
      category: new FormControl('')
    });
    
  }

  onSubmit(): void{
    this.post = this.postForm.value;
    if (this.isAddMode){
      this.createPost(this.post);
      
    }
    else if (!this.isAddMode){

      this.updatePost(this.post);
    }
  }

  createPost(post: Post): void{
    var todayDate = new Date(new Date().toISOString().slice(0, 10))
    const mypost = {
      "title": post.title,
      "author": post.author,
      "category": post.category,
      "content": post.content,
      "date": todayDate,
    } 
    
    this.postService.createArticle(mypost).subscribe({
      complete: () => {
        this.commentsCoponent.wait(6000).then(() => {
          this.getLatestId();
        });
      }
    }
    )
     
  }

  
  getLatestId(): void{
    this.postService.getLatest().subscribe({
      next: (post) => {
        //
      }
    })
  
  }


  private updatePost(post: Post){
    
    var todayDate = new Date(new Date().toISOString().slice(0, 10));
    const mypost = {
      "title": post.title,
      "author": post.author,
      "category": post.category,
      "content": post.content,
      "date": todayDate,
    } as Post
        
    this.postService.updateArticle(mypost, this.id).subscribe({
      complete: () => {

        this.location.back();
        
      }
    });
  }

}
