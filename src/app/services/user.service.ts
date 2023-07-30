import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly server = 'http://localhost:8080/Users';
  constructor(private http : HttpClient) { }

  getUserById(userId: number): Observable<User>{
    return this.http.get<User>(`${this.server}/${userId}`)
  }

  updateUser(user: User, userId: number): Observable<User>{
    return this.http.put<User>(`${this.server}/${userId}`, user);
  }

  getAnnoncesByUserId(userId: number ,page: number=0, size: number=5): Observable<Page>{
    return this.http.get<Page>(`${this.server}/${userId}/annonces?page=${page}&size=${size}`);
  }

}
