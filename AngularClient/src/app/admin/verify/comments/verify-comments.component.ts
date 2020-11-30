import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service'


@Component({
  selector: 'app-verify-comments',
  templateUrl: './verify-comments.component.html',
  styleUrls: ['./verify-comments.component.css']
})
export class VerifyCommentsComponent implements OnInit {

  constructor(private commentService: CommentService) { }

  postsHaveUnverifiedComments: any

  ngOnInit(): void {
    this.getUnverifiedComments()
  }

  getUnverifiedComments() {
    this.commentService.getComment('?verifiedStatus=0').subscribe(data => {
      this.postsHaveUnverifiedComments = data
      console.log(this.postsHaveUnverifiedComments)
    })
  }

  addAllComments(event) {

  }

  addComment(event) {

  }

  verifyComment() {

  }
}
