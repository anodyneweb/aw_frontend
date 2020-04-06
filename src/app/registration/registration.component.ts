import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

   ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', Validators.required],
      industry: ['', Validators.required],
      query: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    
    if (this.registrationForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.register(this.f.email.value, this.f.fname.value, this.f.lname.value, this.f.phone.value, this.f.industry.value, this.f.query.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.error('Registration successfully');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.alertService.error(error.error.detail);
          this.loading = false;
        });
  }
}
