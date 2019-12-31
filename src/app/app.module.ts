import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchPipe } from './search.pipe';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchPipe,
    PaginationBarComponent,
    BankDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
