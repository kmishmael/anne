import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Post } from '../article';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../post.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article.model';


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
  

  constructor(private httpClient: HttpClient, private postService: PostService, private route: ActivatedRoute,
    private location: Location) { }

  goBack():void{
    this.location.back();
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode){
      console.log("we are not adding");
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
      console.log(this.post);
    }
    else if (!this.isAddMode){

      this.updatePost(this.post);
    }
    else{
      console.log("Choice not recognozed");
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
    //let myobj = JSON.stringify(mypost);
    this.postService.createArticle(mypost).subscribe({
      error: error =>{
        console.log('There was an error!', error.message);
      },
      complete: () => {
        this.location.back();
      }
    }
    )
    /*
    this.httpClient.post("http://localhost:8080/post/create", myobj).subscribe({
    next: data => {
      this.data = data;
  },
  error: error => {
      console.error('There was an error!', error.message);
  }
});*/
  
  }

  private updatePost(post: Post){
    console.log(this.id);
    var todayDate = new Date(new Date().toISOString().slice(0, 10));
    const mypost = {
      "title": post.title,
      "author": post.author,
      "category": post.category,
      "content": post.content,
      "date": todayDate,
    } as Post
    console.log(mypost)
    
    this.postService.updateArticle(mypost, this.id).subscribe({
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.location.back();
      }
    });
  }

}
