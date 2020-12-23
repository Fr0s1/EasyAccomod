import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service'
import { NotificationService} from '../../../services/notification.service'

@Component({
  selector: 'admin-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  constructor(private postService: PostService,
              private notificationService: NotificationService) { }

  postsList: any
  selectedPostsID = []
  selectedPostsName = []
  selectedUsername = []
  selectedPostsStatus = []

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
    let postName = event.target.parentElement.nextSibling.nextSibling.innerHTML;
    let username = event.target.parentElement.nextSibling.nextSibling.nextSibling.innerHTML;
    let status = event.target.parentElement.parentElement.lastChild.innerHTML;
    console.log(status);

    if (event.target.checked) {
      if (!this.selectedPostsID.includes(postID)) {
        this.selectedPostsID.push(postID);
        this.selectedPostsName.push(postName);
        this.selectedUsername.push(username);
        this.selectedPostsStatus.push(status);
      }
    } else {
      this.selectedPostsID = this.selectedPostsID.filter(value => value != postID)
      this.selectedPostsName = this.selectedPostsName.filter(value => value != postName)
      this.selectedUsername = this.selectedUsername.filter(value => value != username)
      this.selectedPostsStatus = this.selectedPostsStatus.filter(value => value != status)
    }

    console.log(this.selectedPostsID)
  }

  message: string

  operation: boolean = false
  verifyPost() {
    for (let index in this.selectedPostsID) {
      let postID = this.selectedPostsID[index];
      let postName = this.selectedPostsName[index];
      let accountUsername = this.selectedUsername[index];

      this.postService.updatePost(postID, { verifiedStatus: 1 })
        .subscribe(data => {

          if (Object(data).message) {

            this.operation = true
            this.message = 'Phê duyệt thành công'

            let notificationData = {
              accountUsername: accountUsername,
              postName: postName,
              type: 1,
              postID: postID
            }

            this.notificationService.createNotification(notificationData)
              .subscribe(data => {
                console.log("Created notification");
              })

          }
        });
    }
  }

  denyPost() {
    console.log("click")
    for (let index in this.selectedPostsID) {
      if (this.selectedPostsStatus[index] == "true") {
        let postID = this.selectedPostsID[index];
        this.postService.updatePost(postID, { verifiedStatus: 0 })
        .subscribe(data => {
          console.log(data)
          if (Object(data).message) {
            this.operation = true
            this.message = 'Đã từ chối bài đăng'

          }
        })
      }
      else {

        let postID = this.selectedPostsID[index];
        let postName = this.selectedPostsName[index];
        let accountUsername = this.selectedUsername[index];
        this.operation = true
        this.message = 'Đã từ chối bài đăng'

        let notificationData = {
          accountUsername: accountUsername,
          postName: postName,
          type: 2,
          postID: postID
        }

        this.notificationService.createNotification(notificationData)
          .subscribe(data => {
            console.log("Created notification");
          })

      }
    }
  }

  deletePost() {
    this.selectedPostsID.forEach(postID => {
      this.postService.deletePost(postID).subscribe()
    })
  }

  addAllPost(event) {
    let postList = document.querySelectorAll('td input')
    this.selectedPostsID = []
    this.selectedPostsName = []
    this.selectedUsername = []

    if (!event.target.checked) {
      for (let i = 0; i < postList.length; i++) {
        let currentPost = (<HTMLInputElement>postList[i])

        currentPost.checked = false;
      }
    } else {
      for (let i = 0; i < postList.length; i++) {
        let currentPost = (<HTMLInputElement>postList[i])
        currentPost.checked = true;
        this.selectedPostsID.push(this.postsList[i].postID)
        this.selectedPostsName.push(this.postsList[i].postName)
        this.selectedUsername.push(this.postsList[i].accountUsername)
        this.selectedUsername.push(this.postsList[i].verifiedStatus)
      }
    }
  }
}

