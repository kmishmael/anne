import { Component, Inject, OnInit } from '@angular/core';
import { Opinion } from '../opinion';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../comments.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private commentsService: CommentsService, public dialog: MatDialog) { }

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
      }
      
    })
  };

  getComment(id: string): Observable<any> {
    var subject = new Subject<any>();

    this.commentsService.getComment(id).subscribe({
      next: (comment) => {
        subject.next(comment);
      }
      
    });
    return subject.asObservable();
  }

  createComment(comment: Opinion): void {
    
    var todayDate = new Date(new Date().toISOString().slice(0, 10));
    const mycomment = {
      "post_id": this.route.snapshot.paramMap.get('id'),
      "content": comment.content,
      "likes": 0,
      "date": todayDate,
    } as Opinion
    
    this.commentsService.createComment(mycomment).subscribe({
      complete: () => {
        this.ngOnInit();
      }
    })
  };
  onSubmit(): void{
    this.comment = this.commentForm.value;
    if (this.comment.content === ""){
      alert("Empty comment")
    }
    else{
      this.createComment(this.comment)
    }
  }


  deleteComment(comment_id): void{
    this.commentsService.deleteComment(comment_id).subscribe({
      complete: () => {
      
        this.ngOnInit();

      }
    }
    )
  };

  wait(time): Promise<any>{
    return new Promise(resolve => setTimeout(resolve, time));
  }

  openDialog(id: string) {
    this.getComment(id).subscribe({
      next: (comment) =>{
    
        this.wait(400).then(() => {

          this.comment = comment;
          const dialogRef = this.dialog.open(commentEditSubComponent, {data: this.comment});
          dialogRef.afterClosed().subscribe(result => {
          
          })
        });
        
      }
    }
    )
    
  }

}


//comment edit subcomponent

@Component({
  selector: 'comment-edit',
  templateUrl: 'comment.edit.html',
})
export class commentEditSubComponent implements OnInit{

  comment: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA)public data: any, private commentsComponent: CommentsComponent){
    this.comment = {...data};
  }

  ngOnInit(): void {

  }

  delete(id: string){
    this.commentsComponent.deleteComment(id);
    this.dialog.closeAll();
    location.reload();
  }


}