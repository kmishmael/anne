import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_KEY: string = "/api/profile/";

  constructor(private httpClient: HttpClient) { }

  getById(id: string) {
    return this.httpClient.get<User>(`${this.API_KEY}${id}`);
  }
}
