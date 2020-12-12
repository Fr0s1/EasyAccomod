import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service'
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Role} from '../_model/role'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private authService: AuthService, private commentService: CommentService,
    private route: ActivatedRoute, private accountService: AccountService) { }

  currentAccount = this.authService.currentUserValue

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.postID = +params.get('id')) // Get id in url's params
    this.getVerifiedComments()
  }

  postID
  verifiedCommentList: any

  sendComment(event) {
    let sendNotification = document.querySelector('.send-comment p')


    let commentContent: string = event.target.previousSibling.value;
    
    if (commentContent.length > 0) {
      let verifiedStatus = this.currentAccount.accountType === Role.Admin ? true: false
      sendNotification.setAttribute('class', 'show')
      let comment = {
        content: commentContent,
        accountUsername: this.currentAccount.username,
        PostPostID: this.postID,
        verifiedStatus
      }

      this.commentService.sendComment(comment).subscribe()
    }
  }

  getVerifiedComments() {
    this.commentService.getComment(`?verifiedStatus=1&PostPostID=${this.postID}`).subscribe(data => {
      this.verifiedCommentList = data

      let verifiedComments = []
      this.verifiedCommentList = this.verifiedCommentList.forEach(post => post.comments.forEach(comment => verifiedComments.push(comment)))

      this.verifiedCommentList = verifiedComments

      this.verifiedCommentList.forEach(comment => this.accountService.getAccountInfo(comment.accountUsername).subscribe(data => comment.userInfo = data[0]))
      console.log(this.verifiedCommentList)
    })
  }
}
