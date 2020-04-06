import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let StationsService = class StationsService {
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
        return this.http.get('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/station/', { headers: this.httpHeaderOptions });
    }
    addStation(station_body) {
        return this.http.post('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/station/', station_body.value, { headers: this.httpHeaderOptions });
    }
};
StationsService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], StationsService);
export { StationsService };
//# sourceMappingURL=stations.service.js.map