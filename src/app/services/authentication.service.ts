import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../models/authenticationRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { User } from '../models/user';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly url = 'http://localhost:8080/auth'
  constructor(private http: HttpClient) { }

  authenticate(data: AuthenticationRequest): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.url}/authenticate`, data);
  }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.url}/register`, user);
  }

  public getErrorMessage(fieldName : string, error : ValidationErrors){
    if(error['required']){
      return fieldName + " est obligatoire";
    }else if(error['minlength']){
      return fieldName + " doit dépasser les "+error['minlength']['requiredLength']+" caractères";
    }else if(error['min']){
      return fieldName + " should have min value "+error['min']['min'];
    }else if(error['email']){
      return "Merci de saisir un e-mail valide ";
    }else return "";
  }
}
