import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { AlertService, IndustriesService, AuthenticationService, UserService } from '../_services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface IndustryElement {
  name: string;
  dir: string;
  industry_code: string;
  status: string;
  type: string,
  industry_id: string,
  address: string,
  zipcode: string,
  state: string,
  city: string,
  country: string, 
  created: string

}

const industries: IndustryElement[] = [
  {
    name: "INdustry1",
    dir: "",
    industry_code: "INdustry1",
    status: "Live",
    type: "Aluminium",
    industry_id: "INdustry1",
    address: "INdustry1",
    zipcode: "1",
    state: "Delhi",
    city: "Delhi",
    country: "India",
    created: "2019-12-29T18:56:18.079519Z",
  },
  {
      name: "INdustry12",
      dir: "",
      industry_code: "INdustry12",
      status: "Live",
      type: "Aluminium",
      industry_id: "INdustry12",
      address: "INdustry12",
      zipcode: "110099",
      state: "Delhi",
      city: "Delhi",
      country: "India",
      created: "2019-12-29T18:56:33.270223Z",
      
  },
  {
    name: "INdustry1",
    dir: "",
    industry_code: "INdustry1",
    status: "Live",
    type: "Aluminium",
    industry_id: "INdustry1",
    address: "INdustry1",
    zipcode: "1",
    state: "Delhi",
    city: "Delhi",
    country: "India",
    created: "2019-12-29T18:56:18.079519Z",
  },
  {
      name: "INdustry12",
      dir: "",
      industry_code: "INdustry12",
      status: "Live",
      type: "Aluminium",
      industry_id: "INdustry12",
      address: "INdustry12",
      zipcode: "110099",
      state: "Delhi",
      city: "Delhi",
      country: "India",
      created: "2019-12-29T18:56:33.270223Z",
      
  },
  {
    name: "INdustry1",
    dir: "",
    industry_code: "INdustry1",
    status: "Live",
    type: "Aluminium",
    industry_id: "INdustry1",
    address: "INdustry1",
    zipcode: "1",
    state: "Delhi",
    city: "Delhi",
    country: "India",
    created: "2019-12-29T18:56:18.079519Z",
  },
  {
      name: "INdustry12",
      dir: "",
      industry_code: "INdustry12",
      status: "Live",
      type: "Aluminium",
      industry_id: "INdustry12",
      address: "INdustry12",
      zipcode: "110099",
      state: "Delhi",
      city: "Delhi",
      country: "India",
      created: "2019-12-29T18:56:33.270223Z",
      
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  
  currentUser:User;
  returnUrl = '/'
  displayedColumns: string[] = ['name', 'dir', 'industry_code', 'status', 'type', 'industry_id', 'address', 'zipcode', 'state', 'city', 'country', 'created'];
  dataSource = new MatTableDataSource<IndustryElement>(industries);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private IndustriesService: IndustriesService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

  ngOnInit() {
    if (this.currentUser){
      this.loadIndustriesInfo()
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
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
        });
  }

}

