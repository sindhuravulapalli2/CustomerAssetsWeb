import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
     
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
   

  id!: number;
  cust!: Customer;
  form!: FormGroup;  
 
  AssetsList: any = [];
  CountryList: any = [];
  RegionList: any = [];
  CityList: any = [];
  LocationList: any = [];
 
  constructor(public fb: FormBuilder,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {   
    this.loadmasters();    
    this.id = Number(this.route.snapshot.params['postId']);
    this.customerService.find(this.id).subscribe((data: Customer)=>{  
      this.cust = data;
      this.changeCountry();
      this.changeRegion();
      this.changeCity();  
    }); 
     

    this.form = this.fb.group({
      customerName: new FormControl('', [Validators.required]),
      assetId: new FormControl('', Validators.required),     
      countryId: new FormControl('', Validators.required),     
      regionId: new FormControl('', Validators.required), 
      cityId: new FormControl('', Validators.required), 
      locationId: new FormControl('', Validators.required), 
    });
      
  }
  
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){     
    this.form.value.customerId=Number(this.route.snapshot.params['postId']); 
    this.customerService.update(this.form.value).subscribe((res:any) => {       
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
    // loadregions() {
    //   return this.customerService.getAllRegions().subscribe((data: {}) => {    
    //     this.RegionList  = data;
    //   })
    // }
    
    // loadcities() {
    //   return this.customerService.getAllCities().subscribe((data: {}) => {    
    //     this.CityList = data;
    //   })
    // }
    // loadlocations() {
    //   return this.customerService.getAllLocations().subscribe((data: {}) => {    
    //     this.LocationList = data;
    //   })
    // }
     
    changeCountry() {   
      return this.customerService.filtersRegions(this.cust.CountryId).subscribe((data: {}) => {    
        this.RegionList =data;  
      })     
    }
  
    changeRegion() {   
      return this.customerService.filtersCities(this.cust.CountryId,this.cust.RegionId).subscribe((data: {}) => {    
        this.CityList =data;  
      })     
    }
  
    changeCity() {   
      return this.customerService.filtersLocations(this.cust.CountryId,this.cust.RegionId,this.cust.CityId).subscribe((data: {}) => {    
        this.LocationList  =data;  
      })     
    }
}