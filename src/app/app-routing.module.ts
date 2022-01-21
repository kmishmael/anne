import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { TechnologyComponent } from './tagposts/tagposts.component';
import { PosteditComponent } from './postedit/postedit.component';

const routes: Routes = [
  // home page routes
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: DashboardComponent },
 // { path: 'articles/page/:page', component: DashboardComponent },

  { path: 'article/create', component: PosteditComponent },
  { path: 'article/update/:id', component: PosteditComponent },

  {path: 'article/published/latest', component: PostdetailComponent},

  // home article detail view
  { path: 'article/view/:id', component: PostdetailComponent },

  // Various categories list, detail view routes
  { path: 'category/:category', component: TechnologyComponent },
  { path: 'category/:category/article/:id', component: PostdetailComponent},

  // Create an article
 // {path: 'post/create', component: DashboardComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
