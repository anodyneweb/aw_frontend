import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, IndustriesService, AuthenticationService } from '../_services';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  alert_options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  currentUser:User;
  returnUrl = '/dashboard'
  displayedColumns: string[] = ['name', 'dir', 'industry_code', 'status', 'type', 'industry_id', 'address', 'zipcode', 'state', 'city', 'country', 'created', 'uuid'];
  dataSource = new MatTableDataSource();
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private IndustriesService: IndustriesService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

  ngOnInit() {
    if (this.currentUser){
      this.loadIndustriesInfo();
    }
    else{
      this.alertService.error("Unauthorized");
      this.router.navigate([this.returnUrl]);
    }
  }

  loadIndustriesInfo() {
    this.alertService.clear();
    this.IndustriesService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.dataSource = data['results'];
          this.resultsLength = data['count'];
        },
        error => {
          this.alertService.error('Failed');
        });
  }

  removeIndustry(industry_id) {
    this.alertService.clear();
    this.IndustriesService.deleteIndustry(industry_id)
      .pipe(first())
      .subscribe(
        data => {
          this.loadIndustriesInfo();
          this.alertService.success('Industry deleted successfully', this.alert_options);
        },
        error => {
          this.alertService.error('Delete failed', this.alert_options);
        });
  }

}
