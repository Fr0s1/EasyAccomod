import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { Role } from '../_model/role';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private fb: FormBuilder, private postService: PostService, private accountService: AccountService, private authService: AuthService) { }

  currentAccount // account with token
  userInfo // User information(Full name, phone number, ... ) corresponding to account
  postUploadCost: any // Cost to upload post
  roomImages = [] // mảng lưu các file ảnh của phòng trọ (Blob)
  imgUrls = [] // Array of converted Blobs to [src] url in img tag
  postModel: FormGroup

  ngOnInit(): void {
    this.getPostCost()
    this.currentAccount = this.authService.currentUserValue // Get current logged in account information
    this.getUserInfo()

    // Object thể hiện các thông tin trong form 
    this.postModel = this.fb.group({
      owner: this.fb.group({
        name: [''],
        phoneNumber: [''],
      }),
      postName: ['', [Validators.required]],
      address: this.fb.group({
        homeNumber: ['', [Validators.required]],
        street: ['', [Validators.required]],
        ward: ['', [Validators.required]], // phường
        district: ['', [Validators.required]],
        city: ['', [Validators.required]] // tỉnh/thành phố
      }),
      description: ['', [Validators.required]],
      roomType: ['', [Validators.required]],
      sharedOwner: ['', [Validators.required]], // Chung/ko chung chủ
      area: ['', [Validators.required]],
      roomUtils: this.fb.group({
        airconditioner: ['', [Validators.required]],
        balcony: ['', [Validators.required]],
        bathroom: ['', [Validators.required]],
        kitchen: ['', [Validators.required]],
        electricPrice: ['', [Validators.required]],
        waterPrice: ['', [Validators.required]],
        otherUtils: ['',]
      }),
      roomCost: this.fb.group({
        month: ['', [Validators.required]],
        quarter: ['', [Validators.required]],
        year: ['', [Validators.required]]
      }),
      postDuration: this.fb.group({
        week: ['0', [Validators.required, Validators.min(1)]],
        month: ['0', [Validators.required]],
        year: ['0', [Validators.required]]
      }),
      postCost: [''],
      images: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  // Show preview when upload images
  displayImage(files) {
    for (let i = 0; i < files.length; i++) {
      var reader = new FileReader();
      this.roomImages.push(files[i])
      reader.readAsDataURL(files[i]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imgUrls.push(event.target.result)
        this.postModel.patchValue({
          images: this.roomImages // thêm ảnh vào model để tạo FormData
        })
      }
    }
  }

  uploadURL = 'http://localhost:8080/api/posts'

  sent: boolean = false;
  createPost() {
    var form = document.querySelector('form')
    var formData = new FormData(form)

    if (this.currentAccount.accountType === Role.Admin) {
      const today = new Date()
      let expiredDate = today

      expiredDate.setDate(today.getDate() + parseInt(formData.get('postWeek').toString()) * 7);
      expiredDate.setMonth(today.getMonth() + parseInt(formData.get('postMonth').toString()))
      expiredDate.setFullYear(today.getFullYear() + parseInt(formData.get('postYear').toString()))

      formData.append('verifiedStatus', '1')
      formData.append('paymentStatus', '1')
      formData.append('postTime', new Date().toString())
      formData.append('expiredTime', expiredDate.toString())
      formData.set('postCost', '0')
    } else {
      formData.append('verifiedStatus', '0')
      formData.append('paymentStatus', '0')
    }

    if (this.postModel.valid) {
      this.sent = true
      this.postService.uploadForm(this.uploadURL, formData).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Đăng kí bài đăng cho phòng trọ thành công. Khi được phê duyệt, bạn sẽ nhận được thông báo',
          showConfirmButton: true,
        })
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form information',
        text: 'Please check your form again',
        footer: '<a href>What are the form condition?</a>',
      })
    }
  }

  updateCost() {
    var week = parseInt(this.postModel.get('postDuration.week').value)
    var month = parseInt(this.postModel.get('postDuration.month').value)
    var year = parseInt(this.postModel.get('postDuration.year').value)
    this.postModel.get('postCost').setValue(this.postUploadCost.weekCost * week + this.postUploadCost.monthCost * month + this.postUploadCost.yearCost * year)
  }

  getPostCost() {
    this.postService.getUploadFee(this.uploadURL + '/uploadFee').subscribe(data => this.postUploadCost = data)
  }

  // Show name and phone number of landlord when creating post
  getUserInfo() {
    this.accountService.getAccountInfo(this.currentAccount.username).subscribe(data => {
      this.userInfo = data[0]

      // Fill form with logged in account data
      this.postModel.patchValue({
        owner: {
          name: this.userInfo?.fullName,
          phoneNumber: this.userInfo?.phoneNumber
        }
      })
    })
  };
}