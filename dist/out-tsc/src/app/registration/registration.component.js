import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
let RegistrationComponent = class RegistrationComponent {
    constructor(formBuilder, route, router, authenticationService, alertService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.loading = false;
        this.submitted = false;
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: ['', Validators.required],
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            phone: ['', Validators.required],
            industry: ['', Validators.required],
            query: ['', Validators.required]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.registrationForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.register(this.registrationForm)
            .pipe(first())
            .subscribe(data => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            // this.alertService.error(error.error.detail);
            this.loading = false;
        });
    }
};
RegistrationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styleUrls: ['./registration.component.scss']
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map