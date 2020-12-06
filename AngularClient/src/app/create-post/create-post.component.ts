import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { Account } from '../_model/account'
import { Role } from '../_model/role';

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
  imgUrls = []
  postModel: FormGroup

  ngOnInit(): void {
    this.getPostCost()
    this.currentAccount = this.authService.currentUserValue // Get current logged in account information
    console.log(this.currentAccount)
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
        week: ['1', [Validators.required, Validators.min(1)]],
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

    if (this.postModel.valid) {
      this.sent = true
      this.postService.uploadForm(this.uploadURL, formData).subscribe(res => {
        console.log(res)
      })
    } else {
      console.log('Invalid')
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