import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginVisible = true;
  public registerVisible = false;
  
  constructor() { }
  
  ngOnInit() {
  }

  registerButton() {
    this.loginVisible = false;
    this.registerVisible = true;
  }
  
  confirmButton() {
    this.loginVisible = true;
    this.registerVisible = false;
  }
}
