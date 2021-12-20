import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { TechnologyComponent } from './tagposts/tagposts.component';

const routes: Routes = [
  // home page routes
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // home article detail view
  { path: 'article/:id', component: PostdetailComponent },

  // Various categories list, detail view routes
  { path: 'category/:category', component: TechnologyComponent },
  { path: 'category/:category/article/:id', component: PostdetailComponent},
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
