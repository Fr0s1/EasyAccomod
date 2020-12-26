import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private postService: PostService, private router: Router,
) { }

  latestPosts // Thông tin về các bài đăng preview ở homepage
  latestPostsImages = [] // Lưu 1 ảnh của phòng trọ ứng với mỗi bài đăng

  starpost // thông tin về bài đăng được rate cao nhất ở homepage
  starpostImage = []

  viewpost // thông tin về bài đăng được view cao nhất ở homepage
  viewpostImage = []

  currentTime
  // Tạo mảng để duyệt
  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  ngOnInit(): void {
    this.currentTime = new Date()
    this.getPreviewPost()
    this.getStarPost()
    this.getViewsPost()
  }

  getPreviewPost() {
    // Lấy 4 bài đăng mới nhất
    this.postService.getPreviewPost('postTime').subscribe(posts => {
      this.latestPosts = posts

      this.latestPosts = this.latestPosts.filter(post => new Date(post.expiredTime) >= this.currentTime)
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

  getStarPost() {
    // Lấy 4 bài đăng được rate cao nhất
    this.postService.getPreviewPost('starsReview').subscribe(posts => {
      this.starpost = posts
      this.starpost = this.starpost.filter(post => new Date(post.expiredTime) >= this.currentTime)

      this.starpost.forEach(post => {

        this.postService.getRoomImagesByID(post.roomID).subscribe(imagesList => {

          this.postService.getRoomImageByName(post.roomID, imagesList[0]).subscribe(image => {

            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.starpostImage.push(reader.result)
            }, false);

            if (image) {
              reader.readAsDataURL(image);
            }
          })
        })
      })
    })
  }

  getViewsPost() {
    // Lấy 4 bài đăng có lượt view cao nhất
    this.postService.getPreviewPost('viewsNumber').subscribe(posts => {
      this.viewpost = posts
      
      this.viewpost = this.viewpost.filter(post => new Date(post.expiredTime) >= this.currentTime)
      
      this.viewpost.forEach(post => {

        this.postService.getRoomImagesByID(post.roomID).subscribe(imagesList => {

          this.postService.getRoomImageByName(post.roomID, imagesList[0]).subscribe(image => {

            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.viewpostImage.push(reader.result)
            }, false);

            if (image) {
              reader.readAsDataURL(image);
            }
          })
        })
      })
    })
  }

  toPostPage() {
    this.router.navigate(['/posts'])
  }
}
