import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouriteBanks = [];

  constructor() { }

  addBankToFavourites(bank) {

    this.favouriteBanks.push(bank);
  }

  removeBankFromFavourites(bank) {

    this.favouriteBanks = this.favouriteBanks.filter((favouriteBank) => {
      return bank.ifsc !== favouriteBank.ifsc;
    });

  }

  getFavourites() {

    return this.favouriteBanks;

  }
}
