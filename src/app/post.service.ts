import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, map, tap, concat, of } from 'rxjs';
import { Post, Num } from './article';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl: string = "http://localhost:8080/posts/";
  postNumUrl: string = "http://localhost:8080/num/";
  postUrl: string = "http://localhost:8080/post/";

  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.postsUrl)
    /*
    .pipe(
      catchError(this.handleError<Post[]>('getarticles', []))
    );*/
  }

  getNum(): Observable<Num[]>{
    console.log("Request has been served");
    return this.httpClient.get<Num[]>(this.postNumUrl)
  }
  /*
  getPost(): Observable<Post>{
    console.log("post has been retrieved");
    return this.httpClient.get<Post>(this.postUrl)

  }*/

  getPost(id: string): Observable<Post>{
    return this.httpClient.get<Post>(this.postUrl.concat(id))
  }
}

