import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service'
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Role } from '../_model/role'
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private authService: AuthService, private commentService: CommentService, private postService: PostService,
    private route: ActivatedRoute, private accountService: AccountService) { }

  currentAccount = this.authService.currentUserValue

  createRange(number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  @ViewChild('rating') rating;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => this.postID = +params.get('id')) // Get id in url's params
    this.getVerifiedComments()
  }

  ngAfterViewInit() {
    console.log(this.rating.nativeElement.children)
  }

  postID
  postInfo

  verifiedCommentList: any

  sendComment(event) {
    let sendNotification = document.querySelector('.send-comment p')

    let commentContent: string = event.target.previousSibling.value;

    if (commentContent.length > 0 && this.rated === true) {
      let verifiedStatus = this.currentAccount.accountType === Role.Admin ? true : false
      sendNotification.setAttribute('class', 'show')

      this.postService.getPostsByQuery(`?postID=${this.postID}`).subscribe(result => {
        this.postInfo = result[0]

        let comment = {
          content: commentContent,
          accountUsername: this.currentAccount.username,
          PostPostID: this.postID,
          verifiedStatus,
          starsReview: this.star
        }

        this.commentService.sendComment(comment).subscribe(data => {
          if (this.currentAccount.accountType === Role.Admin) {
            this.postService.updatePost(this.postID, {
              starsReview: this.postInfo.starsReview == '0' ? this.star : (parseFloat(this.postInfo.starsReview) + this.star) / 2
            }).subscribe()
          }
        })
      })
    }
  }

  getVerifiedComments() {
    this.commentService.getComment(`?verifiedStatus=1&PostPostID=${this.postID}`).subscribe(data => {
      this.verifiedCommentList = data

      let verifiedComments = []
      this.verifiedCommentList = this.verifiedCommentList.forEach(post => post.comments.forEach(comment => verifiedComments.push(comment)))

      this.verifiedCommentList = verifiedComments

      this.verifiedCommentList.forEach(comment => this.accountService.getAccountInfo(comment.accountUsername).subscribe(data => comment.userInfo = data[0]))
    })
  }

  rated: boolean = false
  star: number
  showRate(event) {
    this.rated = true;
    this.star = parseInt(event.target.id)
    let id: number = event.target.id

    for (let i = 1; i <= id; i++) {
      this.rating.nativeElement.children[5 - i + 1].className = 'fa fa-star checked';  
    }
  }
}
