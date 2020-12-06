import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  blobToImageUrl(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result)
      return reader.result
    }, false);

    reader.readAsDataURL(image);
  }
}
