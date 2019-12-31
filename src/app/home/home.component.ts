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
  banksCount;
  bankPages = [];
  pageSize = 10;

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

  updatePaginationOptions(selectedCity) {

    this.bankPages = [];

    this.banksCount = this.dataService.getBanksCountBySelectedCity(selectedCity);

    let currentPage = this.dataService.paginationOptions.pageNumber;
    let maxPages = Math.ceil(this.banksCount/this.pageSize);

    let pagesLimit = 5;
    let pagesStart = 1;

    let pageDifference = maxPages - currentPage;

    if(pageDifference == 0) {
      pagesStart = currentPage - 4;
      pagesLimit = currentPage;
    } else if(pageDifference == 1) {
      pagesStart = currentPage - 3;
      pagesLimit = currentPage + 1;
    } else if(pageDifference >= 2) {
      pagesStart = currentPage - 2;
      pagesLimit = currentPage + 2;
    }

    if(currentPage == 1 || currentPage == 2) {
      pagesStart = 1;
      pagesLimit = 5;
    }

    if(maxPages < pagesLimit) {
      pagesLimit = maxPages;
      pagesStart = 1;
    }

    for(let page=pagesStart; page <= pagesLimit; page++){
      this.bankPages.push(page);
    }

  }

  citySelected(selectedCity) {

    if(this.dataService.isDataExists(selectedCity) === true) {
      this.banks = this.dataService.getBankByCity(selectedCity);
      this.updatePaginationOptions(selectedCity);
      return;
    }

    this.dataService.loadData(selectedCity).then((data:any)=>{
      this.banks = data;
      this.updatePaginationOptions(selectedCity);
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

  updatePage(pageNumber) {

    this.dataService.updatePage(pageNumber, this.selectedCity);
    this.citySelected(this.selectedCity);

  }

  incrementPage() {

    if(this.dataService.paginationOptions.pageNumber >= this.bankPages.length) {
      return;
    }

    this.dataService.incrementPage();
    this.citySelected(this.selectedCity);
  }

  decrementPage() {

    if(this.dataService.paginationOptions.pageNumber <= 1) {
      return;
    }

    this.dataService.decrementPage();
    this.citySelected(this.selectedCity);
  }

  changePageLimit(limit) {

    if(limit == null){
      return;
    }

    this.dataService.paginationOptions.limit = limit;
    this.citySelected(this.selectedCity);

  }

  resetPaginationOptions() {
    this.dataService.paginationOptions.pageNumber = 1;
  }

}
