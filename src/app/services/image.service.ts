import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../models/file-handle';
import { Annonce } from './../models/annonce';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private sanitizer: DomSanitizer) { }

  createImg(annonce:  Annonce){
    const annonceImages: any[] = annonce.images;

    const annonceImagesToFile: FileHandle[] = [];

    annonceImages.forEach(element => {
      const imageFileData = element;
      const imageBlob = this.dataUriToBlob(imageFileData.imgByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});
      const finalFileHandle : FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }
      annonceImagesToFile.push(finalFileHandle);

    });
    return annonceImagesToFile;
  }

  dataUriToBlob(picBytes, imageType){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i< byteString.length ; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type: imageType});
    return blob;
  }
}
