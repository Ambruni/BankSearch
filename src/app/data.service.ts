import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  cities = ['MUMBAI', 'BENGALURU', 'CHENNAI', 'KOCHI', 'KOLKATA'];
  banks = {};
  paginationOptions = {
    pageNumber: 1,
    limit: 10
  };

  constructor(
    private http: HttpClient
  ) { }

  loadData(selectedCity) {

    return new Promise(resolve=>
      {
        this.http.get(`http://vast-shore-74260.herokuapp.com/banks?city=${selectedCity}`).subscribe(result => {
          this.banks[selectedCity] = result;
          resolve(this.banks[selectedCity].slice(this.paginationOptions.pageNumber - 1, this.paginationOptions.limit));
        }
      )
  });

  }

  isDataExists(selectedCity) {

    if(typeof this.banks[selectedCity] !== 'undefined') {
      return true;
    }

    return false;

  }

  getCities() {
    return this.cities;
  }

  getBankByCity(selectedCity) {

    return this.banks[selectedCity].slice(this.paginationOptions.pageNumber - 1, this.paginationOptions.limit);

  }
}
