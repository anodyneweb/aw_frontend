import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, AuthenticationService, UserService, StationsService } from '../_services';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})

export class StationComponent implements OnInit {

  alert_options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

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
        },
        error => {
          //this.alertService.error(error);
          this.alertService.error('Session expired');
        });
  }

  removeStation(station_id) {
    this.alertService.clear();
    this.StationService.deleteStation(station_id)
      .pipe(first())
      .subscribe(
        data => {
          this.loadStationsInfo();
          this.alertService.success('Station deleted successfully', this.alert_options);
        },
        error => {
          this.alertService.error('Deleted failed', this.alert_options);
        });
  }

}
