import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { Post, Num } from './article';
import { Article } from './article.model';
import { urls } from '../app/urls.config';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AnyArray } from 'mongoose';
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
  pageSize: number = 16;

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore){ }
  //Observable<DocumentChangeAction<Article>[]>
  
  getArticles(): Observable<DocumentChangeAction<Article>[]>{
    const collection = this.firestore.collection<Article>('posts', ref =>
      ref.orderBy('date', 'desc')
    )
    const posts$ = collection.snapshotChanges();
    return posts$
/*
    .pipe(
      catchError(this.handleError<Post[]>('getarticles', []))
    );*/
  }
  
 /*
  getArticles(): Observable<DocumentChangeAction<unknown>[]>{
    const data = new Observable<DocumentChangeAction<unknown>[]>(this.firestore.collection('posts', ref => 
    ref.orderBy('date', 'desc')
    ).snapshotChanges())
    return data
  }
   */
  getPost(id: string): Observable<any>{
    return this.firestore.collection('posts').doc(id).snapshotChanges()
  }

  getPostsOfCategory(): any{
    return this.firestore.collection('posts', ref =>
    ref.orderBy('date', 'asc').limit(16)
    ).snapshotChanges()
  }

  createPost(post: Article): any{
    return this.firestore.collection('posts').add(post)
  }

  updatePost(post, id: string): Promise<void>{
    return this.firestore.collection('posts').doc(id).update(post)
  }

  getLatestPost(): Observable<Post>{
    console.log(this.httpClient.get<Post>(this.latestPostUrl));
    return this.httpClient.get<Post>(this.latestPostUrl)
  }

}

