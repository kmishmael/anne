import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechnologyComponent } from './tagposts/tagposts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { NetworkInterceptor } from './network.interceptor';
import { PosteditComponent } from './postedit/postedit.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
//import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireModule } from '@angular/fire/compat';
import { CommentsComponent } from './comments/comments.component';
import { optionsubComponent } from './postdetail/postdetail.component';
import { commentEditSubComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    TechnologyComponent,
    DashboardComponent,
    PostdetailComponent,
    PosteditComponent,
    CommentsComponent,
    optionsubComponent, 
    commentEditSubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   // NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
    PostdetailComponent,
    CommentsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
