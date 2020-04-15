import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User, Station } from '../_models';
import { AuthenticationService, AlertService, MiscellaneousService, StationsService, IndustriesService  } from '../_services';

@Component({
  selector: 'app-manage-stations',
  templateUrl: './manage-stations.component.html',
  styleUrls: ['./manage-stations.component.scss']
})
export class ManageStationsComponent implements OnInit {
  alert_options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  loading = false;
  currentUser: User;
  returnUrl = '/stations'
  stationForm: FormGroup;
  all_cities = [];
  all_states = [];
  all_mtypes = ['Effluent', 'Emission', 'CAAQMS']
  all_industries = [];
  all_processes_attached = ['Inlet', 'Outlet']
  all_pcbs = ['MPCCB']
  form_errors: any = {};
  showForm: boolean = false;
  station_id: string = '';
  isNew: boolean = true;
  stationData: any = {};
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private miscellaneousService: MiscellaneousService,
    private alertService: AlertService,
    private stationsService: StationsService,
    private industriesService: IndustriesService,
    private route: ActivatedRoute,
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    if (this.currentUser){
      this.loadCities();
      this.loadStates();
      this.loadIndustries();
      if (this.route.snapshot.params['id']) {
        this.station_id = this.route.snapshot.params['id'];
        this.stationsService.getStation(this.station_id)
        .pipe(first())
        .subscribe(
          data => {
            this.stationData = data;
            this.buildEditStationForm();
          },
          error => {
            this.alertService.error('Failed to fetch station', this.alert_options);
            this.router.navigate(['/dashboard']);
        });
        this.isNew = false;
      }
      if ( this.isNew ) {
        this.buildNewStationForm();
      }
      
    }
    else{
      this.alertService.error("Unauthorized");
      this.router.navigate([this.returnUrl]);
    }
  }

  buildNewStationForm(){
    this.stationForm = this.formBuilder.group({
      name: ['', Validators.required],
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
      pcb: ['', Validators.required],
      monitoring_type: ['', Validators.required],
      process_attached: ['', Validators.required],
      industry: ['', Validators.required],
      ganga_basin: ['', Validators.required],
      approval_date: ['', Validators.required],
      camera: ['', Validators.required],
    });
    this.showForm = true;
  }

  buildEditStationForm(){
    this.stationForm = this.formBuilder.group({
      name: [this.stationData.name, Validators.required],
      prefix: [this.stationData.prefix, Validators.required],
      version: [this.stationData.version, Validators.required],
      address: [this.stationData.address, Validators.required],
      zipcode: [this.stationData.zipcode, Validators.required],
      longitude: [this.stationData.latitude, Validators.required],
      latitude: [this.stationData.latitude, Validators.required],
      state: [this.stationData.state, Validators.required],
      city: [this.stationData.city, Validators.required],
      country: [this.stationData.country, Validators.required],
      user_email: [this.stationData.user_email, Validators.required],
      user_ph: [this.stationData.user_ph, Validators.required],
      seasonal_offline: [this.stationData.seasonal_offline, Validators.required],
      site_status: [this.stationData.site_status, Validators.required],
      pcb: [this.stationData.pcb, Validators.required],
      monitoring_type: [this.stationData.monitoring_type, Validators.required],
      process_attached: [this.stationData.process_attached, Validators.required],
      industry: [this.stationData.industry, Validators.required],
      ganga_basin: [this.stationData.ganga_basin, Validators.required],
      approval_date: [this.stationData.approval_date, Validators.required],
      camera: [this.stationData.camera, Validators.required],
    });
    this.showForm = true;
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

  loadIndustries() {
    this.alertService.clear();
    this.industriesService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.all_industries = data['results'];
        },
        error => {
          this.alertService.error(error);
        });
  }

  saveStation() {
    this.alertService.clear();
    if (this.isNew) {
      this.createStation();
    } else {
      this.updateStation();
    }
  }

  createStation() {
    this.alertService.clear();
    this.stationsService.addStation(this.stationForm)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.error('Station created successfully', this.alert_options);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.form_errors = error.error
          this.alertService.error(error.error.messages[0].message, this.alert_options);
        });
  }

  updateStation() {
    this.stationsService.updateStation(this.station_id, this.stationForm)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate([this.returnUrl]);
          this.alertService.success('Station updated successfully', this.alert_options);
        },
        error => {
          this.form_errors = error.error
          this.alertService.error(error.error.messages[0].message, this.alert_options);
        });
  }

}
