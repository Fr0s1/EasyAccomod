import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private authService: AuthService, private commentService: CommentService, private route: ActivatedRoute) { }

  currentAccount = this.authService.currentUserValue

  ngOnInit(): void {
  }

  postID
  sendComment(event) {
    let commentContent: string = event.target.previousSibling.value;
    // console.log(commentContent)
    this.route.paramMap.subscribe(params => this.postID = +params.get('id')) // Get id in url's params

    let comment = {
      content: commentContent,
      accountUsername: this.currentAccount.username,
      PostPostID: this.postID
    }

    this.commentService.sendComment(comment).subscribe(data => console.log(data))
  }
}
