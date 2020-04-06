import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User, Station } from '../_models';
import { AuthenticationService, AlertService, MiscellaneousService, StationsService  } from '../_services';

@Component({
  selector: 'app-manage-stations',
  templateUrl: './manage-stations.component.html',
  styleUrls: ['./manage-stations.component.scss']
})
export class ManageStationsComponent implements OnInit {
  loading = false;
  currentUser: User;
  returnUrl = '/stations'
  stationForm: FormGroup;
  all_cities = [];
  all_states = [];
  form_errors :any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private miscellaneousService: MiscellaneousService,
    private alertService: AlertService,
    private stationsService: StationsService,
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    if (this.currentUser){
      this.loadCities();
      this.loadStates();
      this.stationForm = this.formBuilder.group({
        name: ['', Validators.required],
        pcb: ['', Validators.required],
        prefix: ['', Validators.required],
        version: ['', Validators.required],
        address: ['', Validators.required],
        zipcode: ['', Validators.required],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        user_email: ['', Validators.required],
        user_ph: ['', Validators.required],
        seasonal_offline: ['', Validators.required],
        site_status: ['', Validators.required],
        monitoring_type: ['', Validators.required],
        process_attached: ['', Validators.required],
        ganga_basin: ['', Validators.required],
        approval_date: ['', Validators.required],
        camera: ['', Validators.required],
      })
    }
    else{
      this.alertService.error("Unauthorized");
      this.router.navigate([this.returnUrl]);
    }
  }

  loadCities() {
    this.alertService.clear();
    this.miscellaneousService.getAllCities()
      .pipe(first())
      .subscribe(
        data => {
          this.all_cities = data['results'];
        },
        error => {
          this.alertService.error(error);
        });
  }

  loadStates() {
    this.alertService.clear();
    this.miscellaneousService.getAllStates()
      .pipe(first())
      .subscribe(
        data => {
          this.all_states = data['results'];
        },
        error => {
          this.alertService.error(error);
        });
  }

  createStation() {
    this.alertService.clear();
    this.stationsService.addStation(this.stationForm)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.error('Station created successfully');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.form_errors = error.error
          this.alertService.error(error.error.messages[0].message);
        });
  }

}
