import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwtHelper: JwtHelperService = new JwtHelperService();
  private decodedToken: any;

  constructor() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token') as string);
  }

  getUserId(){
    return this.decodedToken.userId;
  }

  getFullName(){
    return this.decodedToken.name;
  }

  isLogged(){
    return localStorage.getItem('token');
  }
}
