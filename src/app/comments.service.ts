import { Injectable } from '@angular/core';
import { Opinion } from './opinion';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  commentsUrl: string = "api/article/comments/";
  commentUrl: string = "api/article/comment/view/";
  createUrl: string = "api/article/comment/create";
  updateUrl: string = "api/article/comment/update/";
  deleteUrl: string = "api/article/comment/delete/";
  PostDeleteUrl: string = "api/article/comments/delete/";

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  getComments(post_id: string): Observable<any>{
    return this.httpClient.get<any>(`${this.commentsUrl}${post_id}/`)
    .pipe(
      retry(3)
    )
  }

  getComment(id: string): Observable<any>{
    return this.httpClient.get<any>(`${this.commentUrl}${id}/`)
    .pipe(
      retry(3)
    )
  }

  createComment(comment: Opinion): Observable<any>{
    return this.httpClient.post<Opinion>(this.createUrl, comment)
  }

  updateComment(comment_id: string, comment: any): Observable<any>{
    return this.httpClient.put<any>(this.updateUrl.concat(`${comment_id}/`), comment)
  }

  deleteComment(comment_id: string){
    return this.httpClient.delete<any>(this.deleteUrl.concat(`${comment_id}/`))
  } 

  deleteCommentsOfPost(post_id: string){
    return this.httpClient.delete<any>(this.PostDeleteUrl.concat(`${post_id}/`))
  }

}
