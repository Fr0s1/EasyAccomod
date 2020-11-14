import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
        this.roomModel.patchValue({
          images: this.roomImages // thêm ảnh vào model để tạo FormData
        })
      }
    }
  }

  // Object thể hiện các thông tin trong form 
  roomModel = this.fb.group({
    owner: this.fb.group({
      name: ['Dinh Trong Hieu'],
      phoneNumber: ['0927146476'],
    }),
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
    roomPrice: this.fb.group({
      month: ['', [Validators.required]],
      quarter: ['', [Validators.required]],
      year: ['', [Validators.required]]
    }),
    roomPostDuration: this.fb.group({
      week: ['', [Validators.required, Validators.min(1)]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]]
    }),
    images: ['', [Validators.required, Validators.minLength(3)]]
  })

  createPost() {
    console.log(this.roomModel.value)
    console.log(this.roomImages)
    var form = document.querySelector('form')
    var formData = new FormData(form)
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  }
};
