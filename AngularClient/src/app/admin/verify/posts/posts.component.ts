import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/postService/post.service'
@Component({
  selector: 'admin-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostService) { }

  unverifiedPosts: any
  selectedPosts = []
  ngOnInit(): void {
    this.getUnverifiedPosts()
  }

  targetURL = "http://localhost:8080/api/posts"
  getUnverifiedPosts() {
    this.postService.getUnverifiedPosts(this.targetURL).subscribe(data => this.unverifiedPosts = data)
  }

  addPost(event) {
    let postID = event.target.parentElement.nextSibling.innerHTML;

    if (event.target.checked) {
      if (!this.selectedPosts.includes(postID)) {
        this.selectedPosts.push(postID)
      }
    } else {
      this.selectedPosts = this.selectedPosts.filter(value => value != postID)
    }

    console.log(this.selectedPosts)
  }

  verifyPost() {
    this.selectedPosts.forEach(postID => {
      this.postService.updatePost(this.targetURL + `/${postID}`, { verifiedStatus: 1 }).subscribe(data => {
        console.log(data)
      })
    })
  }

  addAllPost(event) {
    let postList = document.querySelectorAll('td input')

    if (!event.target.checked) {
      this.selectedPosts = []
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

