import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
let AuthenticationService = class AuthenticationService {
    constructor(http) {
        this.http = http;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    login(email, password) {
        return this.http.post('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/token/', { email, password })
            .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }
    register(registeration_body) {
        return this.http.post('http://ec2-3-6-144-180.ap-south-1.compute.amazonaws.com/api/registrations/', { registeration_body })
            .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
        }));
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
};
AuthenticationService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map