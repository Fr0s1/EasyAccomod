import { Component, OnInit } from '@angular/core';
import { NotificationService} from '../services/notification.service'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  currentAccount
  notifications

  constructor(private notficationService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentAccount = this.authService.currentUserValue;
    console.log(this.currentAccount);
    this.notficationService.getUserNotification(this.currentAccount.username)
      .subscribe(data => {
        this.notifications = data;
        console.log(this.notifications)
      });
  }

}
