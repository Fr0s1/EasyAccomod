import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  imageUrl: string
  getImage(): void {
    this.imageService.get()
  }
}
