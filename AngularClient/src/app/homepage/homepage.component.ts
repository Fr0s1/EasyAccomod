import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private postService: PostService, private imgService: ImageService) { }

  previewPosts // Thông tin về các bài đăng preview ở homepage
  previewRoomImagesFilename = [] // Mảng lưu tên các file ảnh ứng với từng phòng trọ
  previewImages = [] // Lưu 1 ảnh ứng với mỗi bài đăng

  // Tạo mảng để duyệt
  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  ngOnInit(): void {
    this.getPreviewPost()
  }

  getPreviewPost() {
    // Lấy 4 bài đăng mới nhất
    this.postService.getPreviewPost('postTime').subscribe(data => {
      this.previewPosts = data

      this.previewPosts.forEach(post => {
        // Với mỗi bài đăng, lấy thông tin về ảnh của phòng trọ
        this.postService.getRoomImagesByID(post.roomID).subscribe(data => {

          // Lấy tên file ảnh đầu tiên của phòng trọ
          this.previewRoomImagesFilename.push(data[0])

          // Request tới server để tải ảnh
          this.postService.getRoomImageByName(post.roomID, data[0]).subscribe(data => {

            // Tạo ảnh từ Blob
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.previewImages.push(reader.result)
            }, false);

            if (data) {
              reader.readAsDataURL(data);
            }

            // this.previewImages.push(this.imgService.blobToImageUrl(data))
            
          })
        })
      })
    })
  }
}
