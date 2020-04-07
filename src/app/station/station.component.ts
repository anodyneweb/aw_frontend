import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User, Station } from '../_models';
import { AlertService, AuthenticationService, UserService, StationsService } from '../_services';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// export interface StationElement {
//   // uuid: string;
//   // industry: string;
//   name: string;
//   pcb: string;
//   // realtime_url: string;
//   // delayed_url: string;
//   prefix: string;
//   version: string;
//   address: string;
//   zipcode: number;
//   longitude: string;
//   latitude: string;
//   state: string;
//   city: string;
//   country: string;
//   user_email: string;
//   user_ph: string;
//   // notify_cpcb: boolean;
//   // cpcb_email: string;
//   // cpcb_ph: string;
//   seasonal_offline: boolean;
//   site_status: string;
//   // closure_status: string;
//   monitoring_type: string;
//   process_attached: string;
//   ganga_basin: boolean;
//   approval_date: string;
//   // is_allowed: boolean;
//   created: string;
//   camera: string;
//   // calibration: boolean;

// }

// const stations: StationElement[] = [
//   {
//     // uuid: '96b3ef1f-8181-4741-b65c-e983eb957dbc',
//     // industry: '388ed39a-970f-4d31-8267-6705f03cb1f9',
//     name: '06TN130_ETP_Clariant Chemicals_Cuddalore',
//     pcb: 'CPCB',
//     // realtime_url: null,
//     // delayed_url: null,
//     prefix: 'CLARIANTCUDDALORE',
//     version: 'ver_1.0',
//     address: '14 Kudidigadi Road ,Sipcot, Cuddalore, Tamilnadu ( North ) - 607005',
//     zipcode: 607005,
//     longitude: '80.270000000000000',
//     latitude: '13.090000000000000',
//     state: 'Tamil Nadu',
//     city: 'Cuddalore',
//     country: 'India',
//     user_email: 'namdev.harihar@clariant.com',
//     user_ph: '9786866584',
//     // notify_cpcb: true,
//     // cpcb_email: '',
//     // cpcb_ph: '',
//     seasonal_offline: false,
//     site_status: 'Live',
//     // closure_status: '',
//     monitoring_type: 'Effluent',
//     process_attached: '',
//     ganga_basin: false,
//     approval_date: '2019-06-10',
//     // is_allowed: true,
//     created: '2019-06-10T17:18:44.366409',
//     camera: '',
//     // calibration: false
//   }
// ];

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})

export class StationComponent implements OnInit {

  currentUser:User;
  returnUrl = '/stations'
  displayedColumns: string[] = [
    // 'uuid',
    // 'industry',
    'name',
    'pcb',
    // 'realtime_url',
    // 'delayed_url',
    'prefix',
    'version',
    'address' ,
    'zipcode' ,
    'longitude',
    'latitude',
    'state',
    'city' ,
    'country',
    'user_email' ,
    'user_ph',
    // 'notify_cpcb',
    // 'cpcb_email',
    // 'cpcb_ph',
    'seasonal_offline',
    'site_status',
    // 'closure_status' ,
    'monitoring_type',
    'process_attached',
    'ganga_basin',
    'approval_date',
    // 'is_allowed',
    'created',
    'camera',
    'uuid'
    // 'calibration' 
  ];
  dataSource = new MatTableDataSource();
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private StationService: StationsService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

   ngOnInit() {
    if (this.currentUser){
      this.loadStationsInfo()
    }
    else{
      this.alertService.error('Unauthorized');
      this.router.navigate([this.returnUrl]);
    }
  }

  loadStationsInfo() {
    this.alertService.clear();
    this.StationService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.dataSource = data['results'];
          this.resultsLength = data['count'];
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
        });
  }

  removeStation(station_id) {
    this.alertService.clear();
    this.StationService.deleteStation(station_id)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          // this.dataSource = data['results'];
          // this.resultsLength = data['count'];
        },
        error => {
          this.alertService.error(error);
        });
  }

}
