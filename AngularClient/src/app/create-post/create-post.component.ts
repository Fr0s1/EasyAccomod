import { Input, Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
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
      }
    }
  }

  // Object thể hiện các thông tin trong form
  roomModel = this.fb.group({
    owner: this.fb.group({
      name: [''],
      phoneNumber: [''],
    }),
    address: this.fb.group({
      homeNumber: [''],
      street: [''],
      ward: [''], // phường
      district: [''],
      city: [''] // tỉnh/thành phố
    }),
    description: [''],
    roomType: [''],
    sharedOwner: [''], // Chung/ko chung chủ
    area: [''],
    roomUtils: this.fb.group({
      airconditioner: [''],
      balcony: [''],
      bathroom: [''],
      kitchen: [''],
      electricPrice: [''],
      waterPrice: [''],
      otherUtils: ['']
    }),
    roomPrice: this.fb.group({
      month: [''],
      quarter: [''],
      year: ['']
    }),
    roomPostDuration: this.fb.group({
      week: [''],
      month: [''],
      year: ['']
    }),
    images: ['']
  })

  createPost() {
    console.log(this.roomModel.value)
    console.log(this.roomImages)
    var formData = JSON.stringify(this.roomModel.value) // Sẽ gửi thông tin form dưới dạng JSON
    console.log(formData)
  }
};
