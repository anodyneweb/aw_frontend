import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User, Station } from '../_models';
import { AuthenticationService, AlertService, MiscellaneousService, StationsService  } from '../_services';

@Component({
  selector: 'app-manage-stations',
  templateUrl: './manage-stations.component.html',
  styleUrls: ['./manage-stations.component.scss']
})
export class ManageStationsComponent implements OnInit {
  
  currentUser: User;
  returnUrl = '/stations'
  stationForm: FormGroup;
  all_cities = [];
  all_states = [];
  form_errors = {};
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
