import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import { FlashMessagesService } from 'ngx-flash-messages';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;
    adminUser: any;
    
    constructor(private http:Http,
         private flashMessageService: FlashMessagesService,
          private router: Router) {   }
    
    register(user){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.post('https://se3316lab05-mustafadawoud97.c9users.io:8081/users/register', user, {headers: headers})
            .map(res => res.json());
        // return req;
    
    }
    
    authenticateUser(user){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.post('https://se3316lab05-mustafadawoud97.c9users.io:8081/users/authenticate ', user, {headers: headers})
            .map(res => res.json());
    }
    
    reSendVeri(user){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.post('https://se3316lab05-mustafadawoud97.c9users.io:8081/users/re-verification-email ', user, {headers: headers})
            .map(res => res.json());
    }
    
    storeUserData(token, user){
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user; 
    }
    
    logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
    
    getProfile(){
        let headers=new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.get('https://se3316lab05-mustafadawoud97.c9users.io:8081/users/profile ', {headers: headers})
            .map(res => res.json());
    }
    
    loadToken(){
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    
}
