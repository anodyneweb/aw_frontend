import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, IndustriesService, AuthenticationService, UserService } from '../_services';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser:User;
  returnUrl = '/'
  displayedColumns: string[] = ['name', 'dir', 'industry_code', 'status', 'type', 'industry_id', 'address', 'zipcode', 'state', 'city', 'country', 'created'];
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
    console.log(this.currentUser)
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
          this.alertService.error(error);
        });
  }

}
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
