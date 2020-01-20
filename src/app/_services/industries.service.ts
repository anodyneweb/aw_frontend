import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../_models';

@Injectable({ providedIn: 'root' })
export class IndustriesService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Industry[]>('http://ec2-13-234-78-142.ap-south-1.compute.amazonaws.com:8000/api/industry/');
  }

}