import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { AccountService } from '../services/account.service';
import { FavoriteService } from '../services/favorite.service'
import { AuthService } from '../services/auth.service';
import { Account } from '../_model/account';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postService: PostService,
    private accountService: AccountService, private authService: AuthService,
    private favoriteSerive: FavoriteService) { }

  currentAccount: Account
  postID: number // Current post
  roomID: number // Room ID corresponding to post

  roomImagesNameList // Get room image's file name saved in server directory
  roomImages = [] // Array saves images file

  postInfo
  roomInfo
  ownerInfo

  favoriteButtonText
  textLoaded = false
  result

  postUrl = 'http://localhost:8080/api/posts'

  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }
  ngOnInit(): void {
    this.currentAccount = this.authService.currentUserValue;

    this.route.paramMap.subscribe(params => this.postID = +params.get('id')) // Get id in url's params

    if (this.currentAccount) {
      this.favoriteSerive.checkUserFavorite(this.postID, this.currentAccount.username)
        .subscribe(result => {
          if ((result as any).liked == true) this.favoriteButtonText = "Unfavorite";
          else this.favoriteButtonText = "Favorite";
          this.textLoaded = true;
          console.log(result)
        });
    }

    this.postService.getPostsByQuery(`?postID=${this.postID}`).subscribe(result => { // Get post by id in the url's params
      this.postInfo = result[0]

      // Increment views number
      this.postService.updatePost(this.postID, { viewsNumber: this.postInfo.viewsNumber + 1 }).subscribe()

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
  }

  changeImage(event) {

    let mainImage = event.target.parentElement.parentElement.firstChild

    mainImage.setAttribute('src', event.target.getAttribute('src'))
  }

  changeFavorite() {
    const data = {
      PostPostID: this.postID,
      accountUsername: this.currentAccount.username
    }
    console.log(data)
    if (this.favoriteButtonText == "Unfavorite") {
      this.favoriteButtonText = "Favorite";
      this.favoriteSerive.deleteFavorite(this.postID, this.currentAccount.username)
      .subscribe(result => {
        console.log("delete");
        this.postInfo.likesNumber--;
        let like_data = {
          likesNumber: this.postInfo.likesNumber
        }
        this.postService.updatePost(this.postID, like_data)
        .subscribe(result => {
          console.log("Decreased");
        })
      });
    }
    else {
      this.favoriteButtonText = "Unfavorite";
      this.favoriteSerive.createFavorite(data)
      .subscribe(result => {
        console.log("create");
        this.postInfo.likesNumber++;
        let like_data = {
          likesNumber: this.postInfo.likesNumber
        }
        this.postService.updatePost(this.postID, like_data)
        .subscribe(result => {
          console.log("Increased");
        })
      });
    }
  }

  showReportArea: boolean = false;
  showReportInput() {
    this.showReportArea = !this.showReportArea
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

      this.postService.sendReport(newReport).subscribe(data => this.sent = true)
    }
  }


}
