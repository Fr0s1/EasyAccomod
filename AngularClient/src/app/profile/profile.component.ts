import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';
import { PostService } from '../services/post.service';
import { AccountService } from '../services/account.service';
import { FavoriteService } from '../services/favorite.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ExtendService} from '../services/extend.service'
import { throwIfEmpty } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService, 
              private authService: AuthService, 
              private messageService: MessageService, 
              private route: ActivatedRoute,
              private favoriteService: FavoriteService,
              private postService: PostService,
              private extendService: ExtendService,
              private router: Router) { }

  currentAccount
  accountInfo
  accountType
  likedPostsID
  likedPosts
  receiver
  postsOfUser // List of posts which posted by currentAccount
  unverifiedPosts
  validLoaded = false
  postExpiredTime = ""
  HTMLminDate = ""
  postDayCost
  extendCost = 0
  extendPostID

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.receiver = params.get('username');
      this.accountService.getAccountByQuery(`?username=${this.receiver}`)
        .subscribe(data => {
          if (!data[0] || data[0].verified == 0) this.router.navigate([`/404`])
          this.validLoaded = true;
          this.accountType = data[0].accountType;
        })
      this.accountService.getAccountInfo(this.receiver)
        .subscribe(data => {
          this.accountInfo = data[0];

        })
      this.likedPostsID = [];
      this.likedPosts = [];
      this.currentAccount = this.authService.currentUserValue;
      if (!this.currentAccount) {
        this.currentAccount = {
          username: ""
        }
      }
      
      this.getPostsOfUser()
      if (this.currentAccount.username == this.receiver) {
        this.getUnverifiedPosts()
      }
      this.getFavoritedPosts()
      this.getPostCost()
    })
  };

  messageContent = new FormControl('');

  sendMessage() {
    const sender = this.currentAccount.username
    const receiver = this.receiver
    const content = this.messageContent.value

    this.messageService.sendMessage(sender, receiver, content).subscribe(data => console.log(data))
  }

  uploadURL = 'http://localhost:8080/api/posts'
  getPostCost() {
    this.postService.getUploadFee(this.uploadURL + '/uploadFee')
      .subscribe(data => { 
        this.postDayCost = (data as any).weekCost / 7;
        console.log(this.postDayCost);
      });
  }

  getUnverifiedPosts() {
    this.postService.getPostsByQuery(`?accountUsername=${this.currentAccount.username}&verifiedStatus=0`)
      .subscribe(posts => {
        this.unverifiedPosts = posts;
      });
  }

  getFavoritedPosts() {
    this.favoriteService.getAllUserFavorite(this.receiver)
      .subscribe(data => {
        for (let index in data) {
          // this.likedPostsID.push((data[index] as any).PostPostID);
          this.postService.getPostsByQuery(`?postID=${(data[index] as any).PostPostID}`)
            .subscribe(data => {
              this.likedPosts.push((data[0]));
            })
        }
      })
  }

  editPost(postID) {
    this.router.navigate([`/edit/${postID}`])
  }

  reformatDate(dateTime) {
    let dateTimeArr = dateTime.split("T")
    let date = dateTimeArr[0].split("-")
    let day = date[2]
    let month = date[1]
    let year = date[0]
    let time = dateTimeArr[1].split(":")
    let hour = time[0]
    let minute = time[1]
    let second = time[2].split(".")[0]
    return `${day}-${month}-${year}`
  }

  processDateForCalculation(dateTime) {
    console.log("d: ", dateTime)
    let date = dateTime.split("-")
    let day = date[0]
    let month = date[1]
    let year = date[2]
    return `${month}-${day}-${year}`
  }

  getHTMLDateFormat(dateTime) {
    let date = dateTime.split(" ")[0].split("-")
    return `${date[2]}-${date[1]}-${parseInt(date[0]) + 1}`
  }

  calculateCost() {
    let input = document.querySelector('input')
    let newDate = new Date(input.value + " " + "00:00:00")
    let oldDate = new Date(this.processDateForCalculation(this.postExpiredTime))
    console.log("New: ", newDate);
    console.log("Old: ", oldDate);
    this.extendCost = this.postDayCost * (newDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24);
  }

  getPostsOfUser() {
    this.postService.getPostsByQuery(`?accountUsername=${this.receiver}&verifiedStatus=1&paymentStatus=1`).subscribe(posts => {
      this.postsOfUser = posts;
    })
  }

  getExtendPostInfo(postID) {
    this.postService.getPostsByQuery(`?postID=${postID}`)
      .subscribe(data => {
        this.extendPostID = postID
        this.postExpiredTime = this.reformatDate(data[0].expiredTime);
        let date = new Date(this.processDateForCalculation(this.postExpiredTime));
        console.log(date)
        date.setDate(date.getDate() + 1);
        date.setHours(7);
        console.log(date)
        this.HTMLminDate = date.toISOString().split('T')[0];
        console.log(this.HTMLminDate)
      })
  }

  createExtendRequest() {
    if (this.extendCost <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Dữ liệu không hợp lệ',
        text: 'Vui lòng chọn ngày hợp lệ cho hạn mới',
        showConfirmButton: true
      })
    }
    else {
      this.extendService.getOneRequest(this.extendPostID)
        .subscribe(data => {
          if (data) {
            Swal.fire({
              icon: 'error',
              title: 'Đã tồn tại yêu cầu gia hạn cho bài đăng này',
              text: 'Bạn chỉ có thể có tối đa 1 yêu cầu gia hạn cho mỗi bài đăng',
              showConfirmButton: true
            })
          }
          else {
            let input = document.querySelector('input')
            let requestData = {
              postID: this.extendPostID,
              price: this.extendCost,
              newExpireDate: input.value + " " + "07:00:00",
            }
            this.extendService.createRequest(requestData)
              .subscribe(result => {
                Swal.fire({
                  icon: 'success',
                  title: 'Gửi yêu cầu gia hạn thành công',
                  text: 'Bạn sẽ nhận được thông báo khi thanh toán và yêu cầu được admin phê duyệt',
                  showConfirmButton: true
                })
              })
          }
        })
    }
  }

  seePost(postID) {
    this.router.navigate([`/post/${postID}`])
  }
}
