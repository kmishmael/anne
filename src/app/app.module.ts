import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechnologyComponent } from './technology/technology.component';
import { InnovationsComponent } from './innovations/innovations.component';
import { AiComponent } from './ai/ai.component';
import { EWasteComponent } from './e-waste/e-waste.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostdetailComponent } from './postdetail/postdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    TechnologyComponent,
    InnovationsComponent,
    AiComponent,
    EWasteComponent,
    DashboardComponent,
    PostdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
