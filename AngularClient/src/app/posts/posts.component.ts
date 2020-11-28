import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    this.postService.getPostsByQuery('?verifiedStatus=1&paymentStatus=1').subscribe(data => console.log(data))
  }
}
