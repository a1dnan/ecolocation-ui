import { JwtService } from './../services/jwt.service';
import { AuthenticationService } from './../services/authentication.service';
import { Annonce } from './../models/annonce';
import { AnnonceService } from './../services/annonce.service';
import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FileHandle } from '../models/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit{
  value: number = 100;
  options: Options = {
    floor: 100,
    ceil: 10000
  };
  urls= [];
  annonce: Annonce={
    titre : "",
    description: "",
    prix: 0,
    duree: 'Courte',
    type: 'Privée',
    ville: "",
    quartier: "",
    disponibilite: "",
    images: []
  }
  
  constructor(private annonceService: AnnonceService,
              private router: Router,
              private jwtService: JwtService,
              private santizer : DomSanitizer){}

  ngOnInit(): void {
    
  }

  saveAnnonce(saveAnnonce: NgForm){

    const annonceFormData = this.prepareFormData(this.annonce);
    this.annonceService.createDemande(annonceFormData, this.jwtService.getUserId()).subscribe({
      next: (response) =>{
        this.router.navigate(['annonces']);
        saveAnnonce.reset();
        this.urls= [];
      }
    })
  }

  prepareFormData(annonce: Annonce): FormData{
    const formData = new FormData();

    formData.append(
      'annonce', new Blob([JSON.stringify(annonce)], {type: 'application/json'})
    );

    for(var i = 0; i< annonce.images.length; i++){
      formData.append(
        'imageFile',
        annonce.images[i].file,
        annonce.images[i].file.name
      );
    }
    return formData;
  }

  onselect(e){
    if(e.target.files){
      for(let i=0; i<=File.length; i++){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(events: any) =>{
          this.urls.push(events.target.result);
        }
      }
    }
  }

  onFileSelect(event){
    if(event.target.files){
      for(let i =0 ; i< event.target.files.length ; i++){
      const file = event.target.files[i];
      const fileHandle : FileHandle = {
          file: file,
          url: this.santizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
      };
      this.annonce.images.push(fileHandle);
    }
      this.onselect(event);
    }
  }

  removeImage(i: number){
    this.urls.splice(i, 1);
  }
}
