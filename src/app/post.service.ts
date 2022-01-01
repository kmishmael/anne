import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Num } from './article';
import { Article } from './article.model';
import { urls } from '../app/urls.config';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
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

  lastVisible: Post[];
  pageSize: number = 12;

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore){ }
  //Observable<DocumentChangeAction<Article>[]>
  getArticles(): any{
    return this.firestore.collection('posts', ref =>
      ref.orderBy('date', 'desc').limit(this.pageSize)
    ).snapshotChanges()
    /*
    .pipe(
      catchError(this.handleError<Post[]>('getarticles', []))
    );*/
  }
  getNextPage(posts: any): any{
    return this.firestore.collection('posts', ref =>
      ref.orderBy('date', 'desc').limit(this.pageSize).startAfter(posts)
    ).snapshotChanges()
  }
   
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

