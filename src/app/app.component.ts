import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from './loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'anne';
  
  loading: boolean = false;

  constructor(public _loading: LoadingService){}

  ngOnInit(): void {
      this.listenToLoading();
  }

  listenToLoading(): void{
    this._loading.loadingSub
    .pipe(delay(0))
    .subscribe((loading) =>{
      this.loading = loading;
    });
  }
}
