import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service'
@Component({
  selector: 'admin-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  constructor(private postService: PostService) { }

  postsList: any
  selectedPosts = []

  selectedPostInfo // Detail of a clicked post
  selectedRoomImagesNameList // Get room image's file name saved in server directory
  selectedRoomImages = [] // Array saves images file

  ngOnInit(): void {
    this.getAllPosts()
  }

  showDeleteButton: boolean = false;
  getPostByType(event) {
    switch (event.target.value) {
      case 'Tất cả':
        this.operation = false
        this.showDeleteButton = false;
        this.getAllPosts()
        break;
      case 'Chưa được duyệt':
        this.operation = false
        this.showDeleteButton = true;
        this.postService.getPostsByQuery('?verifiedStatus=0').subscribe(posts => this.postsList = posts)
        break;
      case 'Đã được duyệt':
        this.operation = false
        this.showDeleteButton = false
        this.postService.getPostsByQuery('?verifiedStatus=1').subscribe(posts => this.postsList = posts)
        break;
      default:
    }
  }

  getAllPosts() {
    this.postService.getPostsByQuery('').subscribe(data => {
      this.postsList = data
      console.log(this.postsList)
    })
  }

  addPost(event) {
    let postID = parseInt(event.target.parentElement.nextSibling.innerHTML);

    if (event.target.checked) {
      if (!this.selectedPosts.includes(postID)) {
        this.selectedPosts.push(postID)
      }
    } else {
      this.selectedPosts = this.selectedPosts.filter(value => value != postID)
    }

    console.log(this.selectedPosts)
  }

  message: string

  operation: boolean = false
  verifyPost() {
    this.selectedPosts.forEach(postID => {
      this.postService.updatePost(postID, { verifiedStatus: 1 }).subscribe(data => {
        if (Object(data).message) {
          this.operation = true
          this.message = 'Phê duyệt thành công'
        }
      })
    })
  }

  denyPost() {
    this.selectedPosts.forEach(postID => {
      this.postService.updatePost(postID, { verifiedStatus: 0 }).subscribe(data => {
        if (Object(data).message) {
          this.operation = true
          this.message = 'Đã từ chối bài đăng'
        }
      })
    })
  }

  deletePost() {
    this.selectedPosts.forEach(postID => {
      this.postService.deletePost(postID).subscribe()
    })
  }

  addAllPost(event) {
    let postList = document.querySelectorAll('td input')
    this.selectedPosts = []

    if (!event.target.checked) {
      for (let i = 0; i < postList.length; i++) {
        let currentPost = (<HTMLInputElement>postList[i])

        currentPost.checked = false;
      }
    } else {
      for (let i = 0; i < postList.length; i++) {
        let currentPost = (<HTMLInputElement>postList[i])

        currentPost.checked = true;
        this.selectedPosts.push(this.postsList[i].postID)
      }
    }
  }

  showRoomInfo(event) {
    this.postService.getPostsByQuery(`?postID=${event.target.innerHTML}`).subscribe(data => {
      this.selectedPostInfo = data[0]
      console.log(this.selectedPostInfo)

      let roomID: number = this.selectedPostInfo?.roomID // Room ID of post

      this.postService.getRoomImagesByID(roomID).subscribe(result => {
        this.selectedRoomImagesNameList = result // Array contains file names

        // Get image files associated with filename and convert from Blob to HTML displayable image
        this.selectedRoomImagesNameList.forEach(filename => this.postService.getRoomImageByName(roomID, filename).subscribe(data => {
          // Create image in html file
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.selectedRoomImages.push(reader.result)
          }, false);

          if (data) {
            reader.readAsDataURL(data);
          }
        }))
      })
    })
  }
}

