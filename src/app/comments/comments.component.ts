import { Component, OnInit } from '@angular/core';
import { Opinion } from '../opinion';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../comments.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  post_id: string;
  comment: Opinion;
  comments: Opinion[];
  commentForm: FormGroup;

  constructor(private route: ActivatedRoute, private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
    //  post_id: new FormControl(''),
      content: new FormControl(''),
     // likes: new FormControl(''),
      //date: new FormControl('')
    });

    this.getComments();
  }
  

  getComments(): void {
    this.post_id = this.route.snapshot.paramMap.get('id');
    this.commentsService.getComments(this.post_id).subscribe({
      next: (comments) =>{
        this.comments = comments
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>{
        console.log("comments collected");
      }
    })
  };

  createComment(comment: Opinion): void {
    console.log("comment creation");
    var todayDate = new Date(new Date().toISOString().slice(0, 10));
    const mycomment = {
      "post_id": this.route.snapshot.paramMap.get('id'),
      "content": comment.content,
      "likes": 0,
      "date": todayDate,
    } as Opinion
    
    this.commentsService.createComment(mycomment).subscribe({
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.ngOnInit();
      }
    })
  };
  onSubmit(): void{
    this.comment = this.commentForm.value;
    this.createComment(this.comment)
  }
/*
  updateComment(comment_id): void{
    this.commentsService.updateComment(comment_id, )
  };
*/
  deleteComment(comment_id): void{
    this.commentsService.deleteComment(comment_id).subscribe({
      error: err => {
        console.log(err);
      }
    }
    )
  };
}
