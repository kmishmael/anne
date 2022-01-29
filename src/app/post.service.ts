import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, filter, map, Observable, retry } from 'rxjs';
import { Post} from './article';
import { urls } from '../app/urls.config';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl: string = "api/articles/";
  postUrl: string = "api/article/";
  createUrl: string = "api/article/create/";
  updateUrl: string = "api/article/update/";
  deleteUrl: string = "api/article/delete/";
  latestUrl: string = "api/article/get/latest/";

  lastVisible: Post[];
  pageSize: number = 16;

  constructor(private httpClient: HttpClient){ }
  
  //get Articles from server through http request
  getArticles(params: HttpParams): Observable<any>{
    return this.httpClient.get<any>(this.postsUrl, {params})
    .pipe(
      retry(3)
    )
  }

  getLatest(): Observable<any>{
    return this.httpClient.get<any>(this.latestUrl)
    .pipe(
      retry(3)
    )
  }

  //get a single article
  getArticle(id: string): Observable<any>{
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.httpClient.get<any>(`${this.postUrl}${id}/`, {headers: reqHeader})
    .pipe(
      retry(3)
    )
  } 
  
  //get Posts belonging to a certain category
  getTaggedPosts(category: string, params: HttpParams): Observable<any>{
    return this.httpClient.get<any>(this.postsUrl.concat(`${category}/`), {params})
    .pipe(
      retry(3)
    )
  }



  //create an article using post request
  createArticle(post: Post): Observable<any>{
    return this.httpClient.post(this.createUrl, post)
  }

  //update the Article
  updateArticle(post: Post, id: string){
    return this.httpClient.put(this.updateUrl.concat(`${id}`), post)
  }
  
  deleteArticle(id: string): Observable<any>{
    return this.httpClient.delete(`${this.deleteUrl}${id}/`)
  }


}

