import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>('http://ec2-13-234-78-142.ap-south-1.compute.amazonaws.com:8000/api/users/');
  }

  register(user: User) {
      return this.http.post(`${config.apiUrl}/users/register`, user);
  }

  delete(id: number) {
      return this.http.delete(`${config.apiUrl}/users/${id}`);
  }
}