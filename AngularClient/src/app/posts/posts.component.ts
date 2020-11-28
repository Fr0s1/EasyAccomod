import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts // Fetch all posts from server

  postImagesFileName = [] // Mảng lưu TÊN file ảnh đầu tiên ứng với từng bài đăng
  postImages = [] // Mảng lưu ẢNH đầu tiên của từng bài đăng 

  pageLength // Tổng cộng bài đăng ở server
  pageSizeOptions = [1, 2, 4] 

  previewPosts // Số bài đăng sẽ hiển thị ở từng trang
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    this.postService.getPostsByQuery('?verifiedStatus=1&paymentStatus=1').subscribe(data => {

      this.posts = data
      this.pageLength = this.posts.length
      this.previewPosts = this.posts.slice(0, this.pageSizeOptions[2]);

      this.posts.forEach(post => {
        // Với mỗi bài đăng, lấy thông tin về ảnh của phòng trọ
        this.postService.getRoomImagesByID(post.roomID).subscribe(data => {

          // Lấy tên file ảnh đầu tiên của phòng trọ
          this.postImagesFileName.push(data[0])

          // Request tới server để tải ảnh
          this.postService.getRoomImageByName(post.roomID, data[0]).subscribe(data => {

            // Tạo ảnh từ Blob
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.postImages.push(reader.result) // thêm vào mảng lưu ảnh
            }, false);

            if (data) {
              reader.readAsDataURL(data);
            }
          })
        })
      })
    })
  }

  pageChangeEvent(event) {
    const offset = event.pageIndex * event.pageSize;
    this.previewPosts = this.posts.slice(offset).slice(0, event.pageSize);
  }
}
