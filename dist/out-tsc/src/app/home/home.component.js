import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
let HomeComponent = class HomeComponent {
    constructor(router, IndustriesService, alertService, authenticationService) {
        this.router = router;
        this.IndustriesService = IndustriesService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.returnUrl = '/';
        this.displayedColumns = ['name', 'dir', 'industry_code', 'status', 'type', 'industry_id', 'address', 'zipcode', 'state', 'city', 'country', 'created'];
        this.dataSource = new MatTableDataSource();
        this.resultsLength = 0;
        this.currentUser = this.authenticationService.currentUserValue;
    }
    ngOnInit() {
        if (this.currentUser) {
            this.loadIndustriesInfo();
        }
        else {
            this.alertService.error("Unauthorized");
            this.router.navigate([this.returnUrl]);
        }
    }
    loadIndustriesInfo() {
        this.alertService.clear();
        this.IndustriesService.getAll()
            .pipe(first())
            .subscribe(data => {
            this.dataSource = data['results'];
            this.resultsLength = data['count'];
        }, error => {
            this.alertService.error(error);
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], HomeComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true })
], HomeComponent.prototype, "sort", void 0);
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
], HomeComponent);
export { HomeComponent };
// export interface IndustryElement {
//   name: string;
//   dir: string;
//   industry_code: string;
//   status: string;
//   type: string,
//   industry_id: string,
//   address: string,
//   zipcode: string,
//   state: string,
//   city: string,
//   country: string, 
//   created: string
// }
//# sourceMappingURL=home.component.js.map