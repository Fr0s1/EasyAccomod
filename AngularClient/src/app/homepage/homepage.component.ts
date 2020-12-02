import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../services/post.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private postService: PostService, private imgService: ImageService) { }

  latestPosts // Thông tin về các bài đăng preview ở homepage
  latestPostsImages = [] // Lưu 1 ảnh của phòng trọ ứng với mỗi bài đăng

  // Tạo mảng để duyệt
  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  ngOnInit(): void {
    this.getPreviewPost()
  }

  getPreviewPost() {
    // Lấy 4 bài đăng mới nhất
    this.postService.getPreviewPost('postTime').subscribe(posts => {
      this.latestPosts = posts

      this.latestPosts.forEach(post => {
        // Với mỗi bài đăng, lấy thông tin về ảnh của phòng trọ
        this.postService.getRoomImagesByID(post.roomID).subscribe(imagesList => {

          // Request tới server để tải ảnh
          this.postService.getRoomImageByName(post.roomID, imagesList[0]).subscribe(image => {

            // Tạo ảnh từ Blob
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.latestPostsImages.push(reader.result)
            }, false);

            if (image) {
              reader.readAsDataURL(image);
            }
          })
        })
      })
    })
  }
}
