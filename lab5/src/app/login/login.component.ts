import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';
// import {AdminService} from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  public reS = false;
  message: Boolean;
  
  constructor(private authService: AuthService,
            private router: Router,
            private flashMessage: FlashMessagesService,
           // private admin: AdminService
           ){
    
  }
  

  ngOnInit() {
  }
  
  onLoginSubmit(){
    
   // if(this.email == "mustafadawoud97@gmail.com" && this.password == "ok"){
      // this.flashMessage.show('Signed in as Admin', {
      //       classes: ['alert', 'alert-success'] });
      //      this.admin.changeMessage(true);
            // this.administrator = true;
   // }
    const user = {
      email: this.email,
      password: this.password,
      __v: 0
    }
    
    this.authService.authenticateUser(user).subscribe(
      res => {
        if(!(res.success)){
          this.flashMessage.show(res.msg, {
            classes: ['alert', 'alert-danger'] });
          //  this.router.navigate(['/login']);
        } 
        
        else if(res.user.__v == 0){
          this.flashMessage.show( "Your account is still not verified", {
            classes: ['alert', 'alert-danger'] });
            this.router.navigate(['/login']);
            this.reS = true;
        }
        
        else{
         //  this.admin.currentAdmin.subscribe(message => this.message = message)
       //   if(this.message){
        //  this.flashMessage.show("You are admin", {
        //    classes: ['alert', 'alert-success'] });
       //   this.authService.storeUserData(res.token, res.user);
       //   this.router.navigate(['/admin']);
        //  }
         // if(!this.message){
          this.flashMessage.show("You are now logged in", {
            classes: ['alert', 'alert-success'] });
          this.authService.storeUserData(res.token, res.user);
          this.router.navigate(['/profile']);
        //  }
        }
      },
      err =>{
        this.flashMessage.show('Something bad happened!', {
            classes: ['alert', 'alert-danger'] });
      });
  }
  
  onResendVerification(){
    const user = {
      email: this.email,
      password: this.password,
      __v: 0
    }
    this.authService.reSendVeri(user).subscribe(
      res =>{
         this.flashMessage.show("Verification Email Re-sent", {
            classes: ['alert', 'alert-success'] });
      }
    );
  }

}

// import { Component, OnInit } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {AuthenticationService} from '../authentication.service';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   public loginVisible = true;
//   public registerVisible = false;
//   private url = "https://lab05-bdicicco.c9users.io:8082/api/accounts/";
//   constructor() { }

//   ngOnInit() {
//   }

//   registerButton() {
//     this.loginVisible = false;
//     this.registerVisible = true;
    
//     //this.authenticationService.registerUser(user);
  
//   }
  
//   confirmButton() {
    
//     this.loginVisible = true;
//     this.registerVisible = false;
//   }
  
//   loginButton() {
//     var user;
//     var pass;
//   // var user = document.getElementById('username').value;
//     //var pass = document.getElementById('password').value;
    
//     if (user == "" && pass == "") {
//       alert("Enter your username and password");
//       return;
//     }
//     else if (user == "") {
//       alert("Enter your username");
//       return;
//     }
//     else if (pass == "") {
//       alert("Enter your password");
//       return;
//     }
    
//     alert(user);
    
//   // this._http.get(this.url+user);
//   }
// }
