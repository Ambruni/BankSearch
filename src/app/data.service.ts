import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavouritesService } from './favourites.service';

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
    private http: HttpClient,
    private favouritesService: FavouritesService
  ) { }

  loadData(selectedCity) {

    return new Promise(resolve=>
      {
        this.http.get(`http://vast-shore-74260.herokuapp.com/banks?city=${selectedCity}`).subscribe(result => {
          this.banks[selectedCity] = result;
          resolve(this.getPopulatedBanks(this.banks[selectedCity].slice(this.paginationOptions.pageNumber - 1, this.paginationOptions.limit)));
        }
      )
  });

  }

  getPopulatedBanks(banks) {

    let favouriteBanks = this.favouritesService.getFavourites();

    let populatedBanks = [];

    for(let bank of banks) {

      bank.favourite = 0;

      for(let favouriteBank of favouriteBanks) {

        if(bank.ifsc == favouriteBank.ifsc) {
          bank.favourite = 1;
        }

      }

      populatedBanks.push(bank);

    }

    return populatedBanks;

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

    return this.getPopulatedBanks(this.banks[selectedCity].slice(this.paginationOptions.pageNumber - 1, this.paginationOptions.limit));

  }

  getBankByIFSC(selectedCity, ifsc) {

    for(let bank of this.banks[selectedCity]) {
      if(bank.ifsc == ifsc) {
        return bank;
      }
    }

  }

}
