import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, IndustriesService, AuthenticationService, UserService, MiscellaneousService } from '../_services';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-manage-industries',
  templateUrl: './manage-industries.component.html',
  styleUrls: ['./manage-industries.component.scss']
})
export class ManageIndustriesComponent implements OnInit {
  currentUser:User;
  returnUrl = '/industries'
  industryForm: FormGroup;
  all_cities = [];
  all_states = [];
  all_users = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private IndustriesService: IndustriesService,
    private MiscellaneousService: MiscellaneousService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    if (this.currentUser){
      this.loadCities();
      this.loadStates();
      this.loadUsers();
      this.industryForm = this.formBuilder.group({
        "uuid": "",
        "name": "",
        "industry_code": "",
        "status": "",
        "type": "",
        "industry_id": "",
        "address": "",
        "zipcode": "",
        "user": "",
        "state": "",
        "city": ""
      })
    }
    else{
      this.alertService.error("Unauthorized");
      this.router.navigate([this.returnUrl]);
    }
  }

  loadCities() {
    this.alertService.clear();
    this.MiscellaneousService.getAllCities()
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
    this.MiscellaneousService.getAllStates()
      .pipe(first())
      .subscribe(
        data => {
          this.all_states = data['results'];
        },
        error => {
          this.alertService.error(error);
        });
  }

  loadUsers() {
    this.alertService.clear();
    this.userService.getAll()
      .pipe(first())
      .subscribe(
        data => {
          this.all_users = data['results'];   
        },
        error => {
          this.alertService.error(error);
        });
  }

  createIndustry() {
    this.alertService.clear();
    console.log(this.industryForm);
    this.IndustriesService.addIndustry(this.industryForm)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.error('Industry created successfully');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
        });
  }

}
