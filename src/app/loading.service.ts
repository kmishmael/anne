import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  loadingSub = new BehaviorSubject<boolean>(false);

  /*
  contains in-progress loading requests
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  //@param loading{boolean}
  //@param url{string}

  setLoading(loading: boolean, url: string): void{
    if(!url){
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');

    }

    if (loading === true){
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    }else if (loading === false && this.loadingMap.has(url))
    {
      this.loadingMap.delete(url);
    }
    if(this.loadingMap.size === 0){
      this.loadingSub.next(false);
    }
  }
/*
  show(){
    this._loading.next(true);
  }

  hide(){
    this._loading.next(false)
  }
  */
}
