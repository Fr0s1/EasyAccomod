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

  unverifiedComments = []
  selectedComments = []

  ngOnInit(): void {
    this.getUnverifiedComments()
  }

  getUnverifiedComments() {
    this.commentService.getComment('?verifiedStatus=0').subscribe(data => {
      this.postsHaveUnverifiedComments = data
      console.log(this.postsHaveUnverifiedComments)
      this.postsHaveUnverifiedComments.forEach(post => post.comments.forEach(comment => this.unverifiedComments.push(comment)))
      console.log(this.unverifiedComments)
    })
  }

  addAllComments(event) {
    let commentsList = document.querySelectorAll('td input')
    this.selectedComments = []

    if (!event.target.checked) {
      for (let i = 0; i < commentsList.length; i++) {
        let currentComment = (<HTMLInputElement>commentsList[i])

        currentComment.checked = false;
      }
    } else {
      for (let i = 0; i < commentsList.length; i++) {
        let currentComment = (<HTMLInputElement>commentsList[i])

        currentComment.checked = true;
        this.selectedComments.push(this.unverifiedComments[i].commentID)
      }
    }

    console.log(this.selectedComments);
  }


  addComment(event) {
    let commentID = parseInt(event.target.parentElement.nextSibling.innerHTML);

    if (event.target.checked) {
      if (!this.selectedComments.includes(commentID)) {
        this.selectedComments.push(commentID)
      }
    } else {
      this.selectedComments = this.selectedComments.filter(value => value != commentID)
    }

    console.log(this.selectedComments)
  }

  verifyComment() {
    this.selectedComments.forEach(commentID => this.commentService.updateComment(commentID, { verifiedStatus: true}).subscribe(data => console.log(data)))
  }

  denyComment() {
    this.selectedComments.forEach(commentID => this.commentService.deleteComment(commentID).subscribe())
  }
}
