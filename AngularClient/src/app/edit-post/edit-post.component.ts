import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private accountService: AccountService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  loaded = false
  currentAccount
  userInfo
  imgUrls
  postID
  postInfo
  roomID
  roomInfo
  postUploadCost: any // Cost to upload post
  postModel: FormGroup
  roomImagesNameList
  imagesUrl = []
  newImagesUrl = []
  roomImages = []

  ngOnInit(): void {
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

    this.route.paramMap.subscribe(params => {

      this.postID = params.get("id");
      this.getInfo(this.postID);
      this.currentAccount = this.authService.currentUserValue // Get current logged in account information
      this.getUserInfo()

      

      this.loaded = true;
    })
    
  }

  deleteImage(img) {
    console.log(img)
  }

  deleteNewImage(img) {
    
  }

  updateCost() {
    var week = parseInt(this.postModel.get('postDuration.week').value)
    var month = parseInt(this.postModel.get('postDuration.month').value)
    var year = parseInt(this.postModel.get('postDuration.year').value)
    this.postModel.get('postCost').setValue(this.postUploadCost.weekCost * week + this.postUploadCost.monthCost * month + this.postUploadCost.yearCost * year)
  }

  displayImage(files) {
    for (let i = 0; i < files.length; i++) {
      var reader = new FileReader();
      this.roomImages.push(files[i])
      reader.readAsDataURL(files[i]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.newImagesUrl.push(event.target.result)
        this.postModel.patchValue({
          images: this.roomImages // thêm ảnh vào model để tạo FormData
        })
      }
    }
  }

  editPost() {
    var form = document.querySelector('form')
    var formData = new FormData(form)
    console.log(this.postModel.value)
  }

  uploadURL = 'http://localhost:8080/api/posts'

  getPostCost() {
    this.postService.getUploadFee(this.uploadURL + '/uploadFee').subscribe(data => {
      this.postUploadCost = data;
      this.updateCost();
    })
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

  getInfo(postID) {
    this.postService.getPostsByQuery(`?postID=${postID}`)
      .subscribe(data => {
        this.postInfo = data[0];
        console.log(this.postInfo);
        this.roomInfo = this.postInfo.Room;
        this.postModel.patchValue({
          postName: this.postInfo.postName,
          address: {
            homeNumber: this.roomInfo.homeNumber,
            street: this.roomInfo.street,
            ward: this.roomInfo.ward, // phường
            district: this.roomInfo.district,
            city:  this.roomInfo.city, // tỉnh/thành phố
          },
          description: this.roomInfo.description,
          roomType: this.roomInfo.roomType,
          sharedOwner: this.roomInfo.sharedOwner ? "Có" : "Không", // Chung/ko chung chủ
          area: this.roomInfo.area,
          roomUtils: {
            airconditioner: this.roomInfo.airconditioner,
            balcony: this.roomInfo.balcony,
            bathroom: this.roomInfo.bathroom,
            kitchen: this.roomInfo.kitchen,
            electricPrice: this.roomInfo.electricityPrice,
            waterPrice: this.roomInfo.waterPrice,
            otherUtils: this.roomInfo.otherUtils
          },
          roomCost: {
            month: this.roomInfo.monthPrice,
            quarter: this.roomInfo.quarterPrice,
            year: this.roomInfo.yearPrice,
          },
          postDuration: {
            week: this.postInfo.postWeek,
            month: this.postInfo.postWeek,
            year: this.postInfo.postYear
          },
        })

        this.postService.getRoomImagesByID(this.roomInfo.roomID).subscribe(result => {
          this.roomImagesNameList = result // Array contains file names
          var imageLoaded = 0;
  
          // Get image files associated with filename and convert from Blob to HTML displayable image
          this.roomImagesNameList.forEach(filename => {
            this.postService.getRoomImageByName(this.roomInfo.roomID, filename)
              .subscribe(data => {
                // Create image in html file
                let reader = new FileReader();
                reader.addEventListener("load", () => {
                  this.imagesUrl.push(reader.result);
                }, false);
      
                if (data) {
                  this.roomImages.push(data);
                  reader.readAsDataURL(data);
                  imageLoaded++;
                  if (imageLoaded == this.roomImagesNameList.length) {
                    console.log("loaded", this.roomImages)
                    console.log(this.imagesUrl)
                    this.postModel.patchValue({
                      images: this.roomImages // thêm ảnh vào model để tạo FormData
                    })
                  }
                }
              })
            
          })

          
        })

        this.getPostCost()
      })
  }

}
