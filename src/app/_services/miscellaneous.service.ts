import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City, State, User } from '../_models';
import { AuthenticationService } from './authentication.service';
@Injectable({ providedIn: 'root' })
export class MiscellaneousService {
  currentUser:User;
  httpHeaderOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser){
      this.httpHeaderOptions = this.httpHeaderOptions.set( 'Authorization', 'Bearer ' + this.currentUser['access'])
    }
  }
  
  getAllStates() {
    return this.http.get<State[]>('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/state/', { headers: this.httpHeaderOptions });
  }

  getAllCities(){
    return this.http.get<City[]>('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/city/', { headers: this.httpHeaderOptions });
  
  }
}