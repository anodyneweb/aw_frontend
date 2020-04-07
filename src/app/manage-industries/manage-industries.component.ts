import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, IndustriesService, AuthenticationService, UserService, MiscellaneousService } from '../_services';

@Component({
  selector: 'app-manage-industries',
  templateUrl: './manage-industries.component.html',
  styleUrls: ['./manage-industries.component.scss']
})
export class ManageIndustriesComponent implements OnInit {
  loading = false;
  currentUser: User;
  returnUrl = '/dashboard'
  industryForm: FormGroup;
  all_cities = [];
  all_states = [];
  all_users = [];
  all_categories = [];
  form_errors = {};
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
      this.loadCategories();
      this.industryForm = this.formBuilder.group({
        name: ['', Validators.required],
        industry_code: ['', Validators.required],
        status: ['', Validators.required],
        type: ['', Validators.required],
        industry_id: ['', Validators.required],
        address: ['', Validators.required],
        zipcode: ['', Validators.required],
        user: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
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

  loadCategories() {
    this.MiscellaneousService.getAllCategories()
      .pipe(first())
      .subscribe(
        data => {
          this.all_categories = data['results'];   
        },
        error => {
          this.alertService.error(error);
        });
  }

  createIndustry() {
    this.alertService.clear();
    this.IndustriesService.addIndustry(this.industryForm)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.error('Industry created successfully');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.form_errors = error.error
          this.alertService.error(error.error.messages[0].message);
        });
  }

}
