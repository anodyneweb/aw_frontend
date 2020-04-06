import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let IndustriesService = class IndustriesService {
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
        return this.http.get('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/industry/', { headers: this.httpHeaderOptions });
    }
    addIndustry(industry_body) {
        return this.http.post('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/industry/', industry_body.value, { headers: this.httpHeaderOptions });
    }
};
IndustriesService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], IndustriesService);
export { IndustriesService };
//# sourceMappingURL=industries.service.js.map