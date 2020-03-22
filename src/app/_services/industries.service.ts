import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Industry, User } from '../_models';
import { AuthenticationService } from './authentication.service';
@Injectable({ providedIn: 'root' })
export class IndustriesService {
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
  getAll() {
    return this.http.get<Industry[]>('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com:8000/api/industry/', {headers: this.httpHeaderOptions});
  }
}