import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service'
import { PostService } from '../../../services/post.service'

@Component({
  selector: 'app-verify-comments',
  templateUrl: './verify-comments.component.html',
  styleUrls: ['./verify-comments.component.css']
})
export class VerifyCommentsComponent implements OnInit {

  constructor(private commentService: CommentService, private postService: PostService) { }

  postsHaveUnverifiedComments: any

  unverifiedComments = []
  selectedComments = []

  ngOnInit(): void {
    this.getUnverifiedComments()
  }

  getUnverifiedComments() {
    this.commentService.getComment('?verifiedStatus=0').subscribe(data => {
      this.postsHaveUnverifiedComments = data
      this.postsHaveUnverifiedComments.forEach(post => post.comments.forEach(comment => {
        this.unverifiedComments.push(comment)
      }))
    })
  }

  addAllComments(event) {
    let commentsList = document.querySelectorAll('td input')
    

    if (!event.target.checked) {
      for (let i = 0; i < commentsList.length; i++) {
        let currentComment = (<HTMLInputElement>commentsList[i])

        currentComment.checked = false;
      }
      this.selectedComments = []

    } else {
      for (let i = 0; i < commentsList.length; i++) {
        let currentComment = (<HTMLInputElement>commentsList[i])

        currentComment.checked = true;
      }
      this.selectedComments = this.unverifiedComments
    }
  }


  addComment(event) {
    let commentID = parseInt(event.target.parentElement.nextSibling.innerHTML);

    if (event.target.checked) {
      if (!this.selectedComments.find(comment => comment.commentID == commentID)) {
        this.selectedComments.push(this.unverifiedComments.find(comment => comment.commentID == commentID))
      }
    } else {
      this.selectedComments = this.selectedComments.filter(value => value.commentID != commentID)
    }
  }

  verifiedSuccessfully: boolean = false
  verifyComment() {
    this.selectedComments.forEach(c => {
      let post = this.postsHaveUnverifiedComments.find(post => post.comments.find(comment => comment.commentID = c.commentID))

      let star = post.starsReview == '0' ? parseInt(c.starsReview) : (parseFloat(post.starsReview) + parseFloat(c.starsReview)) / 2

      this.commentService.updateComment(c.commentID, { verifiedStatus: true }).subscribe(data => this.postService.updatePost(c.PostPostID, { starsReview: star }).subscribe())
    })
  }

  denied: boolean = false;
  denyComment() {
    this.selectedComments.forEach(comment => this.commentService.deleteComment(comment.commentID).subscribe(message => this.denied = true))
  }
}
