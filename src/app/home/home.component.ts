import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FavouritesService } from '../favourites.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  banks = [];
  cities;
  selectedCity;

  constructor(
    private dataService: DataService,
    private favouritesService: FavouritesService,
    private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe(params => {
      if(params.get('selectedCity') !== null){
        this.citySelected(params.get('selectedCity'));
        this.selectedCity = params.get('selectedCity');
      }
    });
  }

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
