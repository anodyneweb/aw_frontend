import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// export interface UserElement {
//   name: string;
//   email: string;
//   type: string;
//   phone: string;
//   created: string;
//   last_login: string;
//   last_pwd_updated: string;
// }
// const users: UserElement[] = [
//   {
//     name: "Mohan Kumar",
//     email: "mohan@aaxisnano.com",
//     is_active: true
//   }
// ];
let UserComponent = class UserComponent {
    constructor(router, alertService, authenticationService, userService) {
        this.router = router;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.returnUrl = '/';
        this.displayedColumns = ['name', 'email'];
        this.dataSource = new MatTableDataSource();
        this.resultsLength = 0;
        this.currentUser = this.authenticationService.currentUserValue;
    }
    ngOnInit() {
        if (this.currentUser) {
            this.loadUsersInfo();
        }
        else {
            this.alertService.error("Unauthorized");
            this.router.navigate([this.returnUrl]);
        }
    }
    loadUsersInfo() {
        this.alertService.clear();
        this.userService.getAll()
            .pipe(first())
            .subscribe(data => {
            this.dataSource = data['results'];
            this.resultsLength = data['count'];
            // this.router.navigate([this.returnUrl]);
        }, error => {
            this.alertService.error(error);
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], UserComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], UserComponent.prototype, "sort", void 0);
UserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user',
        templateUrl: './user.component.html',
        styleUrls: ['./user.component.scss']
    })
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.component.js.map