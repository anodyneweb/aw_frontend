import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
let ManageStationsComponent = class ManageStationsComponent {
    constructor(router, formBuilder, authenticationService, miscellaneousService, alertService, stationsService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.miscellaneousService = miscellaneousService;
        this.alertService = alertService;
        this.stationsService = stationsService;
        this.returnUrl = '/stations';
        this.all_cities = [];
        this.all_states = [];
        this.form_errors = {};
        this.currentUser = this.authenticationService.currentUserValue;
    }
    ngOnInit() {
        if (this.currentUser) {
            this.loadCities();
            this.loadStates();
            this.stationForm = this.formBuilder.group({
                "name": "",
                "pcb": "",
                "prefix": "",
                "version": "",
                "address": "",
                "zipcode": "",
                "longitude": "",
                "latitude": "",
                "state": "",
                "city": "",
                "country": "",
                "user_email": "",
                "user_ph": "",
                "seasonal_offline": "",
                "site_status": "",
                "monitoring_type": "",
                "process_attached": "",
                "ganga_basin": "",
                "approval_date": "",
                "camera": ""
            });
        }
        else {
            this.alertService.error("Unauthorized");
            this.router.navigate([this.returnUrl]);
        }
    }
    loadCities() {
        this.alertService.clear();
        this.miscellaneousService.getAllCities()
            .pipe(first())
            .subscribe(data => {
            this.all_cities = data['results'];
        }, error => {
            this.alertService.error(error);
        });
    }
    loadStates() {
        this.alertService.clear();
        this.miscellaneousService.getAllStates()
            .pipe(first())
            .subscribe(data => {
            this.all_states = data['results'];
        }, error => {
            this.alertService.error(error);
        });
    }
    createStation() {
        this.alertService.clear();
        this.stationsService.addStation(this.stationForm)
            .pipe(first())
            .subscribe(data => {
            this.alertService.error('Station created successfully');
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.form_errors = error.error;
            this.alertService.error(error.error.messages[0].message);
        });
    }
};
ManageStationsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-manage-stations',
        templateUrl: './manage-stations.component.html',
        styleUrls: ['./manage-stations.component.scss']
    })
], ManageStationsComponent);
export { ManageStationsComponent };
//# sourceMappingURL=manage-stations.component.js.map