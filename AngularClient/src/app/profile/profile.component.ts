import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import { MessageService } from '../services/messages.service';
import { PostService } from '../services/post.service';
import { AccountService } from '../services/account.service';
import { FavoriteService } from '../services/favorite.service';
import { ActivatedRoute, Router } from '@angular/router'
import { throwIfEmpty } from 'rxjs/operators';

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
              private postService: PostService,
              private router: Router) { }

  currentAccount
  accountInfo
  accountType
  likedPostsID
  likedPosts
  receiver
  postsOfUser // List of posts which posted by currentAccount
  unverifiedPosts

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.receiver = params.get('username');
      this.accountService.getAccountByQuery(`?username=${this.receiver}`)
        .subscribe(data => {
          if (data[0].verified == 0) this.router.navigate([`/404`])
          this.accountType = data[0].accountType;
        })
      this.accountService.getAccountInfo(this.receiver)
        .subscribe(data => {
          this.accountInfo = data[0];

        })
      this.likedPostsID = [];
      this.likedPosts = [];
      this.currentAccount = this.authService.currentUserValue;
      if (!this.currentAccount) {
        this.currentAccount = {
          username: ""
        }
      }
      
      this.getPostsOfUser()
      if (this.currentAccount.username == this.receiver) {
        this.getUnverifiedPosts()
      }
      this.getFavoritedPosts()
    })
  };

  messageContent = new FormControl('');

  sendMessage() {
    const sender = this.currentAccount.username
    const receiver = this.receiver
    const content = this.messageContent.value

    this.messageService.sendMessage(sender, receiver, content).subscribe(data => console.log(data))
  }

  getUnverifiedPosts() {
    this.postService.getPostsByQuery(`?accountUsername=${this.currentAccount.username}&verifiedStatus=0`)
      .subscribe(posts => {
        this.unverifiedPosts = posts;
      });
  }

  getFavoritedPosts() {
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
  }

  editPost(postID) {
    this.router.navigate([`/edit/${postID}`])
  }

  getPostsOfUser() {
    this.postService.getPostsByQuery(`?accountUsername=${this.receiver}&verifiedStatus=1&paymentStatus=1`).subscribe(posts => {
      this.postsOfUser = posts;
      console.log(this.postsOfUser)
    })
  }

  seePost(postID) {
    this.router.navigate([`/post/${postID}`])
  }
}
