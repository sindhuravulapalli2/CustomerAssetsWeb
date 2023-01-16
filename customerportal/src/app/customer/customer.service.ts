import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
   
import { Asset, City, Country, Customer, Region } from './customer';
    
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  [x: string]: any;
  private apiURL = "http://localhost:54833/api/customer";  
  private commonapiURL = "http://localhost:54833/api/common"; 
       
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods' :'OPTIONS, POST, GET'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
      /**
   * Write code on Method
   *
   * @return response()
   */
      getAll(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(this.apiURL + '/getallcustomers')
        .pipe(
          catchError(this.errorHandler)
        )
      } 
/**
   * Write code on Method
   *
   * @return response()
   */
find(id:number): Observable<any> {     
  return this.httpClient.get(this.apiURL + '/getcustomerbyId/' + id)  
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id:number){  
  return this.httpClient.delete(this.apiURL + '/deletecustomerbyId/' + id, this.httpOptions)  
  .pipe(
    catchError(this.errorHandler)
  )
}

create(post:Customer): Observable<Customer> { 
  return this.httpClient.post<Customer>(this.apiURL + '/addcustomer', JSON.stringify(post), this.httpOptions)
  .pipe(   
    catchError(this.errorHandler)
  )
}  

update(post:Customer): Observable<Customer> {    
  return this.httpClient.put<Customer>(this.apiURL + '/updatecustomer', JSON.stringify(post), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}  

///

getAllAssets(): Observable<Asset[]> {
  return this.httpClient.get<Asset[]>(this.commonapiURL + '/assets')
  .pipe(
    catchError(this.errorHandler)
  )
} 
getAllCountries(): Observable<Country[]> {
  return this.httpClient.get<Country[]>(this.commonapiURL + '/country')
  .pipe(
    catchError(this.errorHandler)
  )
} 

filtersRegions(CountryId: Number): Observable<Region[]> {
  return this.httpClient.get<Region[]>(this.commonapiURL + '/region?CountryId='+CountryId)
  .pipe(
    catchError(this.errorHandler)
  )
} 

filtersCities(CountryId: Number,RegionId: Number): Observable<City[]> {
  return this.httpClient.get<City[]>(this.commonapiURL + '/city?CountryId='+CountryId+'&RegionId='+RegionId)
  .pipe(
    catchError(this.errorHandler)
  )
} 
filtersLocations(CountryId: Number,RegionId: Number,CityId: Number): Observable<Location[]> {
  return this.httpClient.get<Location[]>(this.commonapiURL + '/location?CountryId='+CountryId+'&RegionId='+RegionId+'&CityId='+CityId)
  .pipe(
    catchError(this.errorHandler)
  )
} 

getAllRegions(): Observable<Region[]> {
  return this.httpClient.get<Region[]>(this.commonapiURL + '/getallregions')
  .pipe(
    catchError(this.errorHandler)
  )
} 

getAllCities(): Observable<City[]> {
  return this.httpClient.get<City[]>(this.commonapiURL + '/getallcities')
  .pipe(
    catchError(this.errorHandler)
  )
} 
getAllLocations(): Observable<Location[]> {
  return this.httpClient.get<Location[]>(this.commonapiURL + '/getalllocations')
  .pipe(
    catchError(this.errorHandler)
  )
} 
///

  errorHandler(error: any) {
    debugger;
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('Exception raised: '+errorMessage);
    return throwError(errorMessage);
 }
}