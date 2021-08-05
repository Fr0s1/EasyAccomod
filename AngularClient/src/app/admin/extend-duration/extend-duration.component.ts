import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ExtendService } from '../../services/extend.service'
import { PostService } from '../../services/post.service'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-extend-duration',
  templateUrl: './extend-duration.component.html',
  styleUrls: ['./extend-duration.component.css']
})
export class ExtendDurationComponent implements OnInit {

  constructor(private extendService: ExtendService,
              private postService: PostService,  
              private notificationService: NotificationService) {

              }

  postOfRequests = []
  extendRequests = []
  loaded = false;

  ngOnInit(): void {
    this.extendService.getAllRequest()
      .subscribe(data => {
        var length = (data as any).length;
        var count = 0;
        (this.extendRequests as any) = data;

        this.extendRequests.forEach(request => {
          this.postService.getPostsByQuery(`?postID=${request.postID}`)
            .subscribe(result => {
              this.postOfRequests.push(result[0]);
              count++;
              if (count == length) {
                this.loaded = true;
              }
            })
        });
      })
  }

  reformatDate(dateTime) {
    let dateTimeArr = dateTime.split("T")
    let date = dateTimeArr[0].split("-")
    let day = date[2]
    let month = date[1]
    let year = date[0]
    let time = dateTimeArr[1].split(":")
    let hour = time[0]
    let minute = time[1]
    let second = time[2].split(".")[0]
    return `${day}-${month}-${year}`
  }

  resultDate(dateTime) {
    let dateTimeArr = dateTime.split("T")
    let date = dateTimeArr[0].split("-")
    let day = date[2]
    let month = date[1]
    let year = date[0]
    let time = dateTimeArr[1].split(":")
    let hour = time[0]
    let minute = time[1]
    let second = time[2].split(".")[0]
    return `${year}-${month}-${day}`
  }

  updatePayment(postID, postName, username, newDate) {
    this.extendService.deleteRequest(postID)
      .subscribe(result => {
        let postUpdateData = {
          expiredTime: this.resultDate(newDate)
        }
        this.postService.updatePost(postID, postUpdateData)
          .subscribe(result => {
            Swal.fire({
              icon: 'success',
              title: 'Chấp nhận yêu cầu thành công',
              showConfirmButton: true
            })
            .then((result) => {
              location.reload()
            });
    
            let notiData = {
              accountUsername: username,
              type: 4,
              postID: postID,
              postName: postName
            }
            this.notificationService.createNotification(notiData)
              .subscribe(reuslt => {
                
              })    
          })
        
      })
  }

  denyPayment(postID, postName, username) {
    this.extendService.deleteRequest(postID)
      .subscribe(result => {
        Swal.fire({
          icon: 'success',
          title: 'Từ chối yêu cầu thành công',
          showConfirmButton: true
        })
        .then((result) => {
          location.reload()
        });

        let notiData = {
          accountUsername: username,
          type: 5,
          postID: postID,
          postName: postName
        }
        this.notificationService.createNotification(notiData)
          .subscribe(reuslt => {

          })
      })
  }

}
