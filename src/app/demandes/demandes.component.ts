import { AnnonceService } from './../services/annonce.service';
import { JwtService } from './../services/jwt.service';

import { Page } from './../models/page';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit{

  annonces : Page;
  currentPage: number = 0;

  constructor(private userService: UserService,
              private jwtService: JwtService,
              private annonceService: AnnonceService){}

  ngOnInit(): void {
    this.goToPage();
    
  }

  getAnnoncesByUserId(){
    this.userService.getAnnoncesByUserId(this.jwtService.getUserId()).subscribe({
      next: (data)=>{
        this.annonces = data;
        console.log(this.annonces);
      }
    })
  }

  goToPage(pageNumber: number = 0): void {
    this.userService.getAnnoncesByUserId(this.jwtService.getUserId(), pageNumber).subscribe({
      next: (data)=>{
        this.annonces = data;
        this.currentPage = data.number;
        console.log(this.currentPage);
      }
    })
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPage + 1: this.currentPage - 1);
  }

  delete(annonceId : number){
    this.annonceService.deleteAnnonce(annonceId).subscribe({
      next: (data) =>{
        location.reload();
      }
    })
  }

}
