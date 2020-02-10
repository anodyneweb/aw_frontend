import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface UserElement {
  name: string;
  email: string;
  type: string;
  phone: string;
  created: string;
  last_login: string;
  last_pwd_updated: string;

}

const users: UserElement[] = [
  {
    name: "Mohan Kumar",
    email: "mohan@aaxisnano.com",
    type: "CUSTOMER",
    phone: "9910010837",
    created: "2019-05-08T12:26:27.879376",
    last_login: "2019-05-08T12:26:27.879395",
    last_pwd_updated: "2019-10-12"
  }
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  currentUser:User;
  returnUrl = '/'
  displayedColumns: string[] = ['name', 'email', 'type', 'phone', 'created', 'last_login', 'last_pwd_updated'];
  dataSource = new MatTableDataSource<UserElement>(users);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private route: ActivatedRoute,
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
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
        });
  }


}
