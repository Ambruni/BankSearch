import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  banks = [];
  cities;

  constructor(
    private dataService: DataService,
    private favouritesService: FavouritesService
  ) { }

  ngOnInit() {
    this.cities = this.dataService.getCities();
  }

  citySelected(selectedCity) {

    if(this.dataService.isDataExists(selectedCity) === true) {
      this.banks = this.dataService.getBankByCity(selectedCity);
      return;
    }

    this.dataService.loadData(selectedCity).then((data:any)=>{
      this.banks = data;
   });

  }

  addToFavourites(bank, selectedCity) {

    this.favouritesService.addBankToFavourites(bank);
    this.citySelected(selectedCity);

  }

  removeFromFavourites(bank, selectedCity) {

    this.favouritesService.removeBankFromFavourites(bank);
    this.citySelected(selectedCity);

  }

}
