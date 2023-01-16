import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  issueForm!: FormGroup;
  AssetsList: any = [];
  CountryList: any = [];
  RegionList: any = [];
  CityList: any = [];
  LocationList: any = [];
     
  constructor( public fb: FormBuilder,  public customerService: CustomerService,
     private router: Router) { }

  ngOnInit(): void {
    this.loadmasters();

    this.issueForm = this.fb.group({
      customerName: new FormControl('', [Validators.required]),
      assetId: new FormControl('', Validators.required),     
      countryId: new FormControl('', Validators.required),     
      regionId: new FormControl('', Validators.required), 
      cityId: new FormControl('', Validators.required), 
      locationId: new FormControl('', Validators.required), 
    });
  }


  // get f(){
  //   return this.issueForm.controls;
  // }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){    
    this.customerService.create(this.issueForm.value).subscribe((res:any) => {     
         this.router.navigateByUrl('customer/index');
    })
  }

loadmasters()
{
    this.loadassets();
    this.loadcountries();  
}

  loadassets() {
    return this.customerService.getAllAssets().subscribe((data: {}) => {    
      this.AssetsList = data;
    })
  }
  
  loadcountries() {
    return this.customerService.getAllCountries().subscribe((data: {}) => {    
      this.CountryList = data;
    })
  }

   
  changeCountry() {   
    return this.customerService.filtersRegions(Number(this.issueForm.value.countryId)).subscribe((data: {}) => {    
      this.RegionList =data;  
    })     
  }

  changeRegion() {   
    return this.customerService.filtersCities (Number(this.issueForm.value.countryId),Number(this.issueForm.value.regionId)).subscribe((data: {}) => {    
      this.CityList =data;  
    })     
  }

  changeCity() {   
    return this.customerService.filtersLocations(Number(this.issueForm.value.countryId),Number(this.issueForm.value.regionId),Number(this.issueForm.value.cityId)).subscribe((data: {}) => {    
      this.LocationList  =data;  
    })     
  }
}
