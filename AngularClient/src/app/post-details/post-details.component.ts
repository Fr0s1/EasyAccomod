import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { AccountService } from '../services/account.service';
import { FavoriteService } from '../services/favorite.service'
import { AuthService } from '../services/auth.service';
import { Account } from '../_model/account';
import { ExtendService} from '../services/extend.service'
import { NotificationService} from '../services/notification.service'
import Swal from 'sweetalert2';
import { Backend } from '../_helpers/backend';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})

export class PostDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postService: PostService,
    private accountService: AccountService, private authService: AuthService,
    private favoriteSerive: FavoriteService, private router: Router,
    private notificationService: NotificationService,
    private extendService: ExtendService) { }

  currentAccount: Account
  postID: number // Current post
  roomID: number // Room ID corresponding to post

  roomImagesNameList // Get room image's file name saved in server directory
  roomImages = [] // Array saves images file

  postInfo
  roomInfo
  ownerInfo
  roomState

  favoriteButtonText
  textLoaded = false
  result

  postExpiredTime
  HTMLminDate
  extendCost
  extendPostID
  postDayCost

  postUrl = `${Backend.url}/api/posts`

  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }
  ngOnInit(): void {
    this.currentAccount = this.authService.currentUserValue;

    this.route.paramMap.subscribe(params => {
      this.getPostCost()

      this.postID = +params.get('id')

      if (this.currentAccount) {
        this.favoriteSerive.checkUserFavorite(this.postID, this.currentAccount.username)
          .subscribe(result => {
            if ((result as any).liked == true) this.favoriteButtonText = "Unfavorite";
            else this.favoriteButtonText = "Favorite";
            this.textLoaded = true;
          });
      }

      this.postService.getPostsByQuery(`?postID=${this.postID}`).subscribe(result => { // Get post by id in the url's params
        this.postInfo = result[0]

        if (!this.postInfo) {
          this.router.navigate(['/404'])
        }

        // Increment views number
        this.postService.updatePost(this.postID, { viewsNumber: this.postInfo.viewsNumber + 1 }).subscribe()

        if (this.postInfo.Room.rented) {
          this.roomState = "CHƯA CHO THUÊ";
        }
        else {
          this.roomState = "ĐÃ CHO THUÊ";
        }

        this.roomID = this.postInfo?.roomID // Room ID of post

        // Get info of post's owner
        this.accountService.getAccountInfo(this.postInfo.accountUsername).subscribe(result => this.ownerInfo = result[0])

        this.postService.getRoomImagesByID(this.roomID).subscribe(result => {
          this.roomImagesNameList = result // Array contains file names

          // Get image files associated with filename and convert from Blob to HTML displayable image
          this.roomImagesNameList.forEach(filename => this.postService.getRoomImageByName(this.roomID, filename).subscribe(data => {
            // Create image in html file
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              this.roomImages.push(reader.result)
            }, false);

            if (data) {
              reader.readAsDataURL(data);
            }
          }))
        })
      })
    }) // Get id in url's params
  }

  changeImage(event) {

    let mainImage = event.target.parentElement.parentElement.firstChild

    mainImage.setAttribute('src', event.target.getAttribute('src'))
  }

  changeRoomState() {
    Swal.fire({
      title: `Bạn có chắc chắn muốn chuyển trạng thái phòng thành ${this.roomState}?`,
      showDenyButton: true,
      confirmButtonText: `Chắc chắn`,
      denyButtonText: `Hủy bỏ`,
    }).then((result) => {
      if (result.isConfirmed) {
        let newState = this.postInfo.Room.rented ? 0: 1;
        let updateData = {
          rented: newState
        }
        this.postService.updateRoom(this.roomID, updateData)
          .subscribe(data => {
            Swal.fire('Đã xong !', 'Chuyển trạng thái thành công', 'success')
            .then((result) => {
              let notiData = {
                accountUsername: "admin",
                postName: this.postInfo.postName,
                type: 3,
                postID: this.postInfo.postID
              }
              this.notificationService.createNotification(notiData)
                .subscribe(notiResult => {

                })
              location.reload();
            })
          })
      } else if (result.isDenied) {
        
      }
    })
  }

  changeFavorite() {
    const data = {
      PostPostID: this.postID,
      accountUsername: this.currentAccount.username
    }

    if (this.favoriteButtonText == "Unfavorite") {
      this.favoriteButtonText = "Favorite";
      this.favoriteSerive.deleteFavorite(this.postID, this.currentAccount.username)
        .subscribe(result => {
          this.postInfo.likesNumber--;
          let like_data = {
            likesNumber: this.postInfo.likesNumber
          }
          this.postService.updatePost(this.postID, like_data)
            .subscribe(result => {
            })
        });
    }
    else {
      this.favoriteButtonText = "Unfavorite";
      this.favoriteSerive.createFavorite(data)
        .subscribe(result => {
          this.postInfo.likesNumber++;
          let like_data = {
            likesNumber: this.postInfo.likesNumber
          }
          this.postService.updatePost(this.postID, like_data)
            .subscribe(result => {
            })
        });
    }
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
    let date = dateTime.split("-")
    let day = date[0]
    let month = date[1]
    let year = date[2]
    return `${month}-${day}-${year}`
  }

  getHTMLDateFormat(dateTime) {
    let date = dateTime.split("-")
    return `${date[2]}-${date[1]}-${date[0]}`
  }

  uploadURL = `${Backend.url}/api/posts`

  getPostCost() {
    this.postService.getUploadFee(this.uploadURL + '/uploadFee')
      .subscribe(data => { 
        this.postDayCost = (data as any).weekCost / 7;
      });
  }

  calculateCost() {
    let input = document.querySelector('input')
    let newDate = new Date(input.value + " " + "07:00:00")
    let oldDate = new Date(this.processDateForCalculation(this.postExpiredTime))
    this.extendCost = this.postDayCost * (newDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24);
  }


  showReportArea: boolean = false;
  showReportInput() {
    this.showReportArea = !this.showReportArea
  }

  getExtendPostInfo() {
    this.extendPostID = this.postID
    this.postExpiredTime = this.reformatDate(this.postInfo.expiredTime);
    let date = new Date(this.processDateForCalculation(this.postExpiredTime));
    date.setDate(date.getDate() + 1);
    date.setHours(7);
    this.HTMLminDate = date.toISOString().split('T')[0];
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

  sent: boolean = false;
  sendReport() {
    var reportInput = <HTMLTextAreaElement>(document.querySelector('.report-content textarea'))

    if (reportInput.value.length > 0) {
      var newReport = {
        content: reportInput.value,
        postID: this.postID,
        username: this.currentAccount.username
      }

      this.postService.sendReport(newReport).subscribe(data => {
        this.sent = true;
        Swal.fire({
          icon: 'success',
          title: 'Cảm ơn bạn đã report, chúng tôi sẽ xem xét nhanh nhất có thể',
          showConfirmButton: true,
        })

      })
    }
  }
}
