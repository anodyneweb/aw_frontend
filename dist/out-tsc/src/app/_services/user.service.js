import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let UserService = class UserService {
    constructor(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.httpHeaderOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        this.currentUser = this.authenticationService.currentUserValue;
        if (this.currentUser) {
            this.httpHeaderOptions = this.httpHeaderOptions.set('Authorization', 'Bearer ' + this.currentUser['access']);
        }
    }
    getAll() {
        return this.http.get('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/users/', { headers: this.httpHeaderOptions });
    }
    register(user) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }
    delete(id) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
};
UserService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map