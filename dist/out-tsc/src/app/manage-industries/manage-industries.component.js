import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
let ManageIndustriesComponent = class ManageIndustriesComponent {
    constructor(router, formBuilder, IndustriesService, MiscellaneousService, alertService, authenticationService, userService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.IndustriesService = IndustriesService;
        this.MiscellaneousService = MiscellaneousService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.returnUrl = '/dashboard';
        this.all_cities = [];
        this.all_states = [];
        this.all_users = [];
        this.all_categories = [];
        this.form_errors = {};
        this.currentUser = this.authenticationService.currentUserValue;
    }
    ngOnInit() {
        if (this.currentUser) {
            this.loadCities();
            this.loadStates();
            this.loadUsers();
            this.loadCategories();
            this.industryForm = this.formBuilder.group({
                "name": "",
                "industry_code": "",
                "status": "",
                "type": "",
                "industry_id": "",
                "address": "",
                "zipcode": "",
                "user": "",
                "state": "",
                "city": ""
            });
        }
        else {
            this.alertService.error("Unauthorized");
            this.router.navigate([this.returnUrl]);
        }
    }
    loadCities() {
        this.alertService.clear();
        this.MiscellaneousService.getAllCities()
            .pipe(first())
            .subscribe(data => {
            this.all_cities = data['results'];
        }, error => {
            this.alertService.error(error);
        });
    }
    loadStates() {
        this.alertService.clear();
        this.MiscellaneousService.getAllStates()
            .pipe(first())
            .subscribe(data => {
            this.all_states = data['results'];
        }, error => {
            this.alertService.error(error);
        });
    }
    loadUsers() {
        this.alertService.clear();
        this.userService.getAll()
            .pipe(first())
            .subscribe(data => {
            this.all_users = data['results'];
        }, error => {
            this.alertService.error(error);
        });
    }
    loadCategories() {
        this.MiscellaneousService.getAllCategories()
            .pipe(first())
            .subscribe(data => {
            this.all_categories = data['results'];
        }, error => {
            this.alertService.error(error);
        });
    }
    createIndustry() {
        this.alertService.clear();
        this.IndustriesService.addIndustry(this.industryForm)
            .pipe(first())
            .subscribe(data => {
            this.alertService.error('Industry created successfully');
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.form_errors = error.error;
            this.alertService.error(error.error.messages[0].message);
        });
    }
};
ManageIndustriesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-manage-industries',
        templateUrl: './manage-industries.component.html',
        styleUrls: ['./manage-industries.component.scss']
    })
], ManageIndustriesComponent);
export { ManageIndustriesComponent };
//# sourceMappingURL=manage-industries.component.js.map