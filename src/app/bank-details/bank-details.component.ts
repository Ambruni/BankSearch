import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  bank;
  selectedCity;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bank = this.dataservice.getBankByIFSC(params.get('selectedCity'), params.get('ifsc'));
      this.selectedCity = params.get('selectedCity');
    });
  }

}
