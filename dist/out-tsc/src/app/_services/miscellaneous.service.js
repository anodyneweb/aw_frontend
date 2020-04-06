import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let MiscellaneousService = class MiscellaneousService {
    constructor(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.httpHeaderOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        this.currentUser = this.authenticationService.currentUserValue;
        if (this.currentUser) {
            this.httpHeaderOptions = this.httpHeaderOptions.set('Authorization', 'Bearer ' + this.currentUser['access']);
        }
    }
    getAllStates() {
        return this.http.get('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/state/', { headers: this.httpHeaderOptions });
    }
    getAllCities() {
        return this.http.get('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/city/', { headers: this.httpHeaderOptions });
    }
    getAllCategories() {
        return this.http.get('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/category/', { headers: this.httpHeaderOptions });
    }
};
MiscellaneousService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], MiscellaneousService);
export { MiscellaneousService };
//# sourceMappingURL=miscellaneous.service.js.map