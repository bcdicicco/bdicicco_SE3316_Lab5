import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class CollectionService {
private databaseURL = "https://lab05-bdicicco.c9users.io:8081/users";
 
  constructor(private http:Http) { }

getUserCollections(email:String){
  let headers = new Headers();
  console.log(localStorage.getItem('id_token'));
  headers.append("Authorization", localStorage.getItem('id_token'));
  
 // console.log(email + "from getusercollec");
  return this.http.get(this.databaseURL + "/collections/usercollections/" + email, {headers: headers})
    .map(res => res.json());
}

sendCollection(collection){
    console.log("3");
    console.log(collection.email + "Inside sendcollection");
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.databaseURL + '/collection', collection,{headers: headers})
      .map(res => res.json());
  }

}
