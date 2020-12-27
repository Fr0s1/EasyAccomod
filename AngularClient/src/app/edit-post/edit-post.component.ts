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
  oldImagesToDelete = []

  ngOnInit(): void {
    this.postModel = this.fb.group({
      postID: [''],
      roomID: [''],
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
      this.currentAccount = this.authService.currentUserValue // Get current logged in account information
      this.getInfo(this.postID);
      this.getUserInfo()

      this.loaded = true;
    })

  }

  // User want to delete old image
  deleteImage(img) {
    if (!this.oldImagesToDelete.includes(img))
      this.oldImagesToDelete.push(img)
  }

  // User cancel deleting old image
  cancelDeleteImage(img) {
    this.oldImagesToDelete.splice(this.oldImagesToDelete.indexOf(img), 1)
  }


  // User want to cancel uploading a new image
  deleteNewImage(img) {
    let index = this.newImagesUrl.indexOf(img);
    this.newImagesUrl.splice(index, 1);
    this.roomImages.splice(index, 1);
    this.postModel.patchValue({
      images: this.roomImages // thêm ảnh vào model để tạo FormData
    })
  }

  updateCost() {
    var week = parseInt(this.postModel.get('postDuration.week').value)
    var month = parseInt(this.postModel.get('postDuration.month').value)
    var year = parseInt(this.postModel.get('postDuration.year').value)
    this.postModel.get('postCost').setValue(this.postUploadCost.weekCost * week + this.postUploadCost.monthCost * month + this.postUploadCost.yearCost * year)
  }

  // Add new image to upload
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

  // oldImagesToDelete: Array containing list of old images's name user want to delete
  // this.postModel.value.get('images'): New images user want to upload
  editPost() {
    var form = document.querySelector('form')
    var formData = new FormData(form)

    this.postService.updatePostAndRoomInfo(formData).subscribe(data => this.oldImagesToDelete.forEach(fileName => this.postService.deleteRoomImage(this.postInfo.roomID, fileName).subscribe()))
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
        if (data[0].accountUsername != this.currentAccount.username) {
          this.router.navigate([`/404`]);
        }
        this.postInfo = data[0];
        this.roomInfo = this.postInfo.Room;
        this.postModel.patchValue({
          postID: this.postInfo.postID,
          roomID: this.postInfo.roomID,
          postName: this.postInfo.postName,
          address: {
            homeNumber: this.roomInfo.homeNumber,
            street: this.roomInfo.street,
            ward: this.roomInfo.ward, // phường
            district: this.roomInfo.district,
            city: this.roomInfo.city, // tỉnh/thành phố
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
                  reader.readAsDataURL(data);
                  imageLoaded++;
                }
              })
          })

        })

        this.getPostCost()
      })
  }

}
