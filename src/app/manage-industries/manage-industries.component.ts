import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  alert_options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  loading = false;
  currentUser: User;
  returnUrl = '/dashboard'
  industryForm: FormGroup;
  all_cities = [];
  all_states = [];
  all_users = [];
  all_categories = [];
  form_errors: any = {};
  showForm: boolean = false;
  industry_id: string = '';
  isNew: boolean = true;
  industryData: any = {};
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private IndustriesService: IndustriesService,
    private MiscellaneousService: MiscellaneousService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    if (this.currentUser){
      this.loadCities();
      this.loadStates();
      this.loadUsers();
      this.loadCategories();
      if (this.route.snapshot.params['id']) {
        this.industry_id = this.route.snapshot.params['id'];
        this.IndustriesService.getIndustry(this.industry_id)
        .pipe(first())
        .subscribe(
          data => {
            this.industryData = data;
            this.buildEditIndustryForm();
          },
          error => {
            this.alertService.error('Failed to fetch industry', this.alert_options);
            this.router.navigate(['/dashboard']);
        });
        this.isNew = false;
      }
      if ( this.isNew ) {
        this.buildNewIndustryForm();
      }
    }
    else{
      this.alertService.error("Unauthorized");
      this.router.navigate([this.returnUrl]);
    }
  }

  buildNewIndustryForm() {
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
    });
    this.showForm = true;
  }

  buildEditIndustryForm() {
    this.industryForm = this.formBuilder.group({
      name: [this.industryData.name, Validators.required],
      industry_code: [this.industryData.industry_code, Validators.required],
      status: [this.industryData.status, Validators.required],
      type: [this.industryData.type, Validators.required],
      industry_id: [this.industryData.industry_id, Validators.required],
      address: [this.industryData.address, Validators.required],
      zipcode: [this.industryData.zipcode, Validators.required],
      user: [this.industryData.user, Validators.required],
      state: [this.industryData.state, Validators.required],
      city: [this.industryData.city, Validators.required],
    })
    this.showForm = true;
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

  saveIndustry() {
    this.alertService.clear();
    if (this.isNew) {
      this.addIndustry();
    } else {
      this.updateIndustry();
    }
  }

  addIndustry() {
    this.IndustriesService.addIndustry(this.industryForm)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate([this.returnUrl]);
          this.alertService.success('Industry created successfully', this.alert_options);
        },
        error => {
          this.form_errors = error.error
          this.alertService.error(error.error.messages[0].message, this.alert_options);
        });
  }

  updateIndustry() {
    this.IndustriesService.updateIndustry(this.industry_id, this.industryForm)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate([this.returnUrl]);
          this.alertService.success('Industry updated successfully', this.alert_options);
        },
        error => {
          this.form_errors = error.error
          this.alertService.error(error.error.messages[0].message, this.alert_options);
        });
  }

}
