import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Num } from './article';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  SERVER_URL: string = "http://localhost:8080/";
  postsUrl: string = `${this.SERVER_URL}posts/`;
  postUrl: string = `${this.SERVER_URL}post/`;
  createUrl: string = `${this.SERVER_URL}post/create`;
  updateUrl: string = `${this.SERVER_URL}post/update`;
  deleteUrl: string = `${this.SERVER_URL}post/delete`;
  latestPostUrl: string = `${this.SERVER_URL}latest`;
  urlCreate: string = "http://localhost:8080/post/create";

  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.postsUrl)
    /*
    .pipe(
      catchError(this.handleError<Post[]>('getarticles', []))
    );*/
  }


  /*
  getPost(): Observable<Post>{
    console.log("post has been retrieved");
    return this.httpClient.get<Post>(this.postUrl)

  }*/

  getPost(id: string): Observable<Post>{
    return this.httpClient.get<Post>(this.postUrl.concat(id))
  }

  getPostsOfCategory(category: string): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.postsUrl.concat(category))
  }

  createPost(post): Observable<any>{
    console.log(post);
    return this.httpClient.post(this.urlCreate, post)
  }

  updatePost(post, id): Observable<any>{
    return this.httpClient.put(this.updateUrl.concat(id), post)
  }

  getLatestPost(): Observable<Post>{
    console.log(this.httpClient.get<Post>(this.latestPostUrl));
    return this.httpClient.get<Post>(this.latestPostUrl)
  }

}

