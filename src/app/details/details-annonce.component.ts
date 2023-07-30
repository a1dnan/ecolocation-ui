import { JwtService } from './../services/jwt.service';
import { ImageService } from './../services/image.service';
import { AnnonceService } from './../services/annonce.service';
import { Annonce } from './../models/annonce';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit{

  isConnected: boolean = false;

  annonce: Annonce;

  constructor(private annonceService: AnnonceService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              public jwtService: JwtService
              ){}

  ngOnInit(): void {
    const annonceId = this.activatedRoute.snapshot.params['id'];
    this.getAnnonceById(annonceId);
  }

  getAnnonceById(id: number){
    this.annonceService.getAnnonceById(id)
      .subscribe({
      next: (data: Annonce) => {
          this.annonce = data;
          this.annonce.images = this.imageService.createImg(this.annonce);
          console.log(this.annonce);

      }
    })
  }


  
}
