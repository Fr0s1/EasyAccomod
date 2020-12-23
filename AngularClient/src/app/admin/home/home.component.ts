import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../services/statistic.service'
import { PostService } from '../../services/post.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private statService: StatisticService, private postService: PostService) { }

  mostViewedPost
  mostViewedPostImage

  mostLikesPost
  mostLikesPostImage

  timeInfo // Object contain time range and number of posts
  ngOnInit(): void {
    this.getMostViewedPost()
    this.getMostLikesPost()
    this.getTimeRangeHasMostPost()
  }

  getMostViewedPost() {
    this.statService.getPostOrderByColumn('viewsNumber').subscribe(postList => {
      this.mostViewedPost = postList[0]
      console.log(this.mostViewedPost)

      this.postService.getRoomImagesByID(this.mostViewedPost.roomID).subscribe(imageLists => {

        // Request tới server để tải ảnh
        this.postService.getRoomImageByName(this.mostViewedPost.roomID, imageLists[0]).subscribe(image => {

          // Tạo ảnh từ Blob
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.mostViewedPostImage = reader.result // Khi load ảnh xong, lưu vào mảng  
          }, false);

          if (image) {
            reader.readAsDataURL(image);
          }
        })
      })
    })
  }

  getMostLikesPost() {
    this.statService.getPostOrderByColumn('likesNumber').subscribe(postList => {
      this.mostLikesPost = postList[0]
      console.log(this.mostLikesPost)

      this.postService.getRoomImagesByID(this.mostLikesPost.roomID).subscribe(imageLists => {

        // Request tới server để tải ảnh
        this.postService.getRoomImageByName(this.mostLikesPost.roomID, imageLists[0]).subscribe(image => {

          // Tạo ảnh từ Blob
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.mostLikesPostImage = reader.result // Khi load ảnh xong, lưu vào mảng  
          }, false);

          if (image) {
            reader.readAsDataURL(image);
          }
        })
      })
    })
  }

  getTimeRangeHasMostPost() {
    this.statService.getTimeRangeHasMostPosts().subscribe(result => this.timeInfo = result[0])
  }
}
