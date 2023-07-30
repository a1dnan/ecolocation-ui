import { Annonce } from './../models/annonce';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private readonly server = 'http://localhost:8080/annonces';

  constructor(private http : HttpClient) { }

  createDemande(annonce : FormData, userId:number) : Observable<Annonce> {
    return this.http.post<Annonce>(`${this.server}/add/${userId}`, annonce);
  }

  getAllAnnonces() :Observable<Annonce[]>{
    return this.http.get<Annonce[]>(this.server);
  }

  getAnnonces(keyword: string="", page: number=0, size: number=6): Observable<Page>{
    return this.http.get<Page>(`${this.server}/search?keyword=${keyword}&page=${page}&size=${size}`);
  }

  getAnnonceById(annonceId: number): Observable<Annonce>{
    return this.http.get<Annonce>(`${this.server}/${annonceId}`)
  }

  deleteAnnonce(annonceId: number): Observable<any>{
    return this.http.delete<any>(`${this.server}/${annonceId}`);
  }



}
