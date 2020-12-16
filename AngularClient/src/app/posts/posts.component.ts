import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from './../services/post.service'
import geographicData from '../../assets/example.json';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  data = geographicData

  posts // All posts fetched from server

  // Phục vụ cho preview
  postImages = [] // Mảng lưu file ẢNH đầu tiên của mỗi bài đăng 

  pageLength // Tổng cộng số bài đăng ở thanh pagination
  pageSizeOptions = [1, 2, 4] // Tùy chọn số bài đăng hiển thị ở mỗi trang

  searchedPosts // Kết quả tìm kiếm bài đăng
  previewPosts  // Những bài đăng sẽ được hiển thị ở từng trang dựa theo pageSizeOptions và searchedPosts

  pageNumber: number = 0 // trang hiện tại bằng 0

  constructor(private postService: PostService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.getPost() // Fetched all posts from server
  }

  // When user interacts with pagination bar
  goToPage() {
    this.paginator.pageIndex = this.pageNumber - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  getPost() {
    this.postService.getPostsByQuery('?verifiedStatus=1&paymentStatus=1').subscribe(postsList => {

      this.posts = postsList

      this.posts = this.posts.filter(post => new Date(post.expiredTime) >= new Date())

      this.pageLength = this.posts.length
      this.previewPosts = this.posts.slice(0, this.pageSizeOptions[2]);

      this.posts.forEach(post => {
        // Với mỗi bài đăng, lấy thông tin về ảnh của phòng trọ

        this.postService.getRoomImagesByID(post.roomID).subscribe(imageLists => {

          // Request tới server để tải ảnh
          this.postService.getRoomImageByName(post.roomID, imageLists[0]).subscribe(image => {

            // Tạo ảnh từ Blob
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.postImages.push(reader.result) // Khi load ảnh xong, lưu vào mảng  
            }, false);

            if (image) {
              reader.readAsDataURL(image);
            }
          })
        })
      })
    })
  }

  searched: boolean = false // Kiểm tra xem người dùng đã ấn nút tìm kiếm chưa
  pageChangeEvent(event) {
    if (this.searched) {
      const offset = event.pageIndex * event.pageSize;

      this.previewPosts = this.searchedPosts.slice(offset).slice(0, event.pageSize);

    } else {
      const offset = event.pageIndex * event.pageSize;
      this.previewPosts = this.posts.slice(offset).slice(0, event.pageSize);
    }
  }

  selectedDistrict
  fetchWards(event) {
    this.selectedDistrict = geographicData[0].district.filter(ward => ward.name === event.target.value)[0].ward
  }

  searchPost() {
    this.searched = true
    let requirement = document.querySelectorAll('select')
    let input = document.querySelectorAll('.search input')

    let requirementObject = {}

    requirement.forEach(data => {
      if (data.value !== 'Chọn...') {
        requirementObject[data.name] = data.value
      }
    })

    input.forEach(<HTMLInputElement>(data) => {
      if (data.value.length !== 0) {
        requirementObject[data.name] = data.value
      }
    })

    this.postService.findPost(requirementObject).subscribe(data => {
      this.searchedPosts = data

      this.searchedPosts = this.searchedPosts.filter(post => new Date(post.expiredTime) >= new Date())

      this.paginator.pageIndex = 0;
      this.pageLength = this.searchedPosts.length

      this.paginator.page.next({
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    })
  }

  resetPost() {
    this.searched = false
    this.previewPosts = this.posts
    this.pageLength = this.posts.length
    this.pageNumber = 0
  }
}
