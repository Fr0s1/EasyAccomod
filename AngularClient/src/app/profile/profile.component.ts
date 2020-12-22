import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';
import { PostService } from '../services/post.service';
import { AccountService } from '../services/account.service';
import { FavoriteService } from '../services/favorite.service';
import { PostService} from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService, 
              private authService: AuthService, 
              private messageService: MessageService, 
              private route: ActivatedRoute,
              private favoriteService: FavoriteService,
              private postService: PostService) { }

  currentAccount
  accountInfo
  accountType
  likedPostsID
  likedPosts
  receiver
  postsOfUser // List of posts which posted by currentAccount

  ngOnInit(): void {
    this.likedPostsID = [];
    this.likedPosts = [];
    this.route.paramMap.subscribe(params => this.receiver = params.get('username'))
    this.currentAccount = this.authService.currentUserValue;
    this.accountService.getAccountInfo(this.receiver)
      .subscribe(data => {
        this.accountInfo = data[0];
      })
    this.accountService.getAccountByQuery(`?username=${this.receiver}`)
      .subscribe(data => {
        this.accountType = data[0].accountType;
      })
    this.getPostsOfUser()
    this.favoriteService.getAllUserFavorite(this.receiver)
      .subscribe(data => {
        for (let index in data) {
          // this.likedPostsID.push((data[index] as any).PostPostID);
          this.postService.getPostsByQuery(`?postID=${(data[index] as any).PostPostID}`)
            .subscribe(data => {
              this.likedPosts.push((data[0]));
            })
        }
        console.log(this.likedPosts);
      })
  };

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
