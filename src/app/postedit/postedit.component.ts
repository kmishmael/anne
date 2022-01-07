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

    /*
    if (!this.isAddMode){
      console.log("Seems we are not adding this time");
      this.postService.getPost(this.id)
        .subscribe(x => this.rawForm = x.map(
          e => {
            const obj = {
              id: e.payload.doc.id,
              title: e.payload.doc.get('title'),
              author: e.payload.doc.get('author'),
              category: e.payload.doc.get('category'),
              content: e.payload.doc.get('content'),
              date: e.payload.doc.get('date'),
            } as Article;
            console.log(obj);
          }
        )
        )
         // this.postForm.patchValue(e);
    }
*/
    if(!this.isAddMode){
      this.postService.getPost(this.id)
      .subscribe(post => {
        this.rawForm = {
            id: post.payload.id,
            ...post.payload.data() as Article,
          };
      console.log(this.rawForm);
    
      })
    }

    this.postForm = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      content: new FormControl(''),
      category: new FormControl('')
    });
    this.onSubmit();
    
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
    var todayDate = new Date().toISOString().slice(0, 10);

    const mypost = {
      "title": post.title,
      "author": post.author,
      "category": post.category,
      "content": post.content,
      "date": todayDate,
    } as Article
    //let myobj = JSON.stringify(mypost);
    this.postService.createPost(mypost).subscribe({
      error: error =>{
        console.log('There was an erro!', error.message);
      }}
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
    var todayDate = new Date().toISOString().slice(0, 10);
    const mypost = {
      "title": post.title,
      "author": post.author,
      "category": post.category,
      "content": post.content,
      "date": todayDate,
    } as Article
    /*
    this.postService.updatePost(JSON.stringify(mypost), this.id)
        .subscribe({
          error: error => {
            this.loading = false;
          }
        });
    alert("The Article has been updated.");*/
    this.postService.updatePost(mypost, this.id)
  }

}
