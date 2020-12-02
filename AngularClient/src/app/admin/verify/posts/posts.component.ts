import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service'
@Component({
  selector: 'admin-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  constructor(private postService: PostService) { }

  unverifiedPosts: any
  selectedPosts = []
  ngOnInit(): void {
    this.getUnverifiedPosts()
  }

  targetURL = "http://localhost:8080/api/posts"
  getUnverifiedPosts() {
    this.postService.getPostsByQuery('?verifiedStatus=0').subscribe(data => {
      this.unverifiedPosts = data
      console.log(this.unverifiedPosts)
    })
  }

  addPost(event) {
    let postID = parseInt(event.target.parentElement.nextSibling.innerHTML);

    if (event.target.checked) {
      if (!this.selectedPosts.includes(postID)) {
        this.selectedPosts.push(postID)
      }
    } else {
      this.selectedPosts = this.selectedPosts.filter(value => value != postID)
    }

    console.log(this.selectedPosts)
  }

  verifiedSuccessfully: boolean = false
  verifyPost() {
    this.selectedPosts.forEach(postID => {
      this.postService.updatePost(postID, { verifiedStatus: 1 }).subscribe(data => {
        if (Object(data).message) {
          this.verifiedSuccessfully = true
        }
      })
    })
  }


  addAllPost(event) {
    let postList = document.querySelectorAll('td input')
    this.selectedPosts = []

    if (!event.target.checked) {
      for (let i = 0; i < postList.length; i++) {
        let currentPost = (<HTMLInputElement>postList[i])

        currentPost.checked = false;
      }
    } else {
      for (let i = 0; i < postList.length; i++) {
        let currentPost = (<HTMLInputElement>postList[i])

        currentPost.checked = true;
        this.selectedPosts.push(this.unverifiedPosts[i].postID)
      }
    }

    console.log(this.selectedPosts);
  }
}

