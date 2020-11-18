import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms'
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getUrl() {
    return "./../assets/background3.jpg";
  }

  logIn() {
    
  }

}
