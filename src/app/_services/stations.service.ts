import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../_models';

@Injectable({ providedIn: 'root' })
export class StationsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Station[]>('http://ec2-13-234-78-142.ap-south-1.compute.amazonaws.com:8000/api/station/');
  }

}