import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(banks: any, searchKey: string): any {
    if(typeof searchKey=="undefined"|| searchKey==""){
      return banks;
    }
    return banks.filter(bank =>{
      if(bank.ifsc.toLowerCase().includes(searchKey.toLowerCase())||
      bank.branch.toLowerCase().includes(searchKey.toLowerCase())||
      bank.address.toLowerCase().includes(searchKey.toLowerCase())||
      bank.district.toLowerCase().includes(searchKey.toLowerCase())||
      bank.state.toLowerCase().includes(searchKey.toLowerCase())||
      bank.bank_name.toLowerCase().includes(searchKey.toLowerCase())
      ){
        return bank;
      }
    });
  }

}
