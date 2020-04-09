import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, AuthenticationService, UserService } from '../_services';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


// export interface UserElement {
//   name: string;
//   email: string;
//   type: string;
//   phone: string;
//   created: string;
//   last_login: string;
//   last_pwd_updated: string;

// }

// const users: UserElement[] = [
//   {
//     name: "Mohan Kumar",
//     email: "mohan@aaxisnano.com",
//     is_active: true
//   }
// ];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  currentUser:User;
  returnUrl = '/'
  displayedColumns: string[] = ['name', 'email'];
  dataSource = new MatTableDataSource();
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

   ngOnInit() {
    if (this.currentUser){
      this.loadUsersInfo()
    }
    else{
      this.alertService.error("Unauthorized");
      this.router.navigate([this.returnUrl]);
    }
  }

  loadUsersInfo() {
    this.alertService.clear();
    this.userService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.dataSource = data['results'];
          this.resultsLength = data['count'];
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error('Session expired');
        });
  }


}
