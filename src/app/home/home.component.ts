import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  banks = [];
  cities;

  constructor(
    private dataService: DataService
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

}
