import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private postService: PostService) { }

  currentAccount
  receiver
  postsOfUser // List of posts which posted by currentAccount

  ngOnInit(): void {  
    this.route.paramMap.subscribe(params => this.receiver = params.get('username'))
    this.currentAccount = this.authService.currentUserValue
    this.getPostsOfUser()
  }

  messageContent = new FormControl('');

  sendMessage() {
    const sender = this.currentAccount.username
    const receiver = this.receiver
    const content = this.messageContent.value

    this.messageService.sendMessage(sender, receiver, content).subscribe(data => console.log(data))
  }

  getPostsOfUser() {
    this.postService.getPostsByQuery(`?accountUsername=${this.currentAccount.username}`).subscribe(posts => {
      this.postsOfUser = posts;
      console.log(this.postsOfUser)
    })
  }
}
