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
    if (!this.selectedPosts.includes(event.target.innerHTML)) {
      this.selectedPosts.push(event.target.innerHTML)
    }
    console.log(this.selectedPosts)
  }

  verifyPost() {
    this.selectedPosts.forEach(postID => {
      this.postService.updatePost(this.targetURL + `/${postID}`, { verifiedStatus: 1 }).subscribe(data => console.log(data))
    })
  }
}

