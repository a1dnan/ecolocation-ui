import { JwtService } from './../services/jwt.service';
import { AnnonceService } from './../services/annonce.service';
import { Annonce } from './../models/annonce';
import { Component, OnInit } from '@angular/core';
import { Page } from '../models/page';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit{

  annonces: Page;
  currentPage: number = 0;


  constructor(private annonceService : AnnonceService,
              public jwtService : JwtService){}

  ngOnInit(): void {
    this.goToPage();
    // if(this.jwtService.getUserId()){
    //   this.isLogged = true;
    // }
  
  }

  // getAllAnnonces(){
  //   this.annonceService.getAnnonces().subscribe({
  //     next: (data) =>{
  //       this.annonces = data;
  //       console.log(this.annonces);
  //     }
  //   })
  // }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.annonceService.getAnnonces(name,pageNumber).subscribe({
      next: (data)=>{
        this.annonces = data;
        this.currentPage = data.number;
        console.log(this.annonces);
      }
    })
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.goToPage(name, direction === 'forward' ? this.currentPage + 1: this.currentPage - 1);
  }


}
