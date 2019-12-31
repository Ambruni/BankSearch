import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouriteBanks = [];

  constructor() { 
    this.extractFavourites();
   }

  extractFavourites() {

    let favouriteBanks = JSON.parse(localStorage.getItem("favouriteBanks"));

    if(favouriteBanks === null) {
      return;
    }

    this.favouriteBanks = JSON.parse(localStorage.getItem("favouriteBanks"));

  }

  addBankToFavourites(bank) {
    this.favouriteBanks.push({ifsc: bank.ifsc});
    this.storeFavourites();
  }

  removeBankFromFavourites(bank) {

    this.favouriteBanks = this.favouriteBanks.filter((favouriteBank) => {
      return bank.ifsc !== favouriteBank.ifsc;
    });

    this.storeFavourites();

  }

  storeFavourites() {

    localStorage.setItem("favouriteBanks", JSON.stringify(this.favouriteBanks));

  }

  getFavourites() {

    return this.favouriteBanks;

  }
}
