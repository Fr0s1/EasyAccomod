import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private postService: PostService) { }

  previewPosts
  previewRoomImagesFilename = []
  previewImages = []

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  apiUrl: string = 'http://localhost:8080/api/posts'
  ngOnInit(): void {
    this.getPreviewPost()
  }

  getPreviewPost() {
    this.postService.getPreviewPost(this.apiUrl + '?limit=4').subscribe(data => {
      this.previewPosts = data

      this.previewPosts.forEach(post => {
        this.postService.getRoomImagesByID(post.roomID).subscribe(data => {
          this.previewRoomImagesFilename.push(data[0])
          this.postService.getRoomImageByName(post.roomID, data[0]).subscribe(data => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.previewImages.push(reader.result)
            }, false);

            if (data) {
              reader.readAsDataURL(data);
            }
          })
        })
      })
    })
  }
}
