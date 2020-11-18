import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UploadPostService } from '../services/createPost/upload-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private fb: FormBuilder, private uploadService: UploadPostService) { }

  ngOnInit(): void {
  }

  postDurationCost = {
    weekCost: 5,
    monthCost: 20,
    yearCost: 100,
  }
  roomImages = [] // mảng lưu các file ảnh của phòng trọ (Blob)
  imgUrls = []
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

  // Object thể hiện các thông tin trong form 
  postModel = this.fb.group({
    owner: this.fb.group({
      name: ['Dinh Trong Hieu'],
      phoneNumber: ['0927146476'],
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

  createPost() {
    var form = document.querySelector('form')
    var formData = new FormData(form)
    var uploadURL = 'http://localhost:8080/api/posts'

    this.uploadService.uploadForm(uploadURL, formData).subscribe(res => {
      console.log(res)
    })
  }

  updateCost() {
    var week = parseInt(this.postModel.get('postDuration.week').value)
    var month = parseInt(this.postModel.get('postDuration.month').value)
    var year = parseInt(this.postModel.get('postDuration.year').value)
    this.postModel.get('postCost').setValue(this.postDurationCost.weekCost * week + this.postDurationCost.monthCost * month + this.postDurationCost.yearCost * year)
  }
};
