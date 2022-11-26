import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
//import { FlatpickrDirective, FLATPICKR_CONTROL_VALUE_ACCESSOR } from 'angularx-flatpickr/flatpickr.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlatpickrModule.forRoot()
  ],
  providers: [
  //   {
  //   provide: NG_VALUE_ACCESSOR,
  //   useExisting: FlatpickrDirective,
  //   multi: true,
  // },FLATPICKR_CONTROL_VALUE_ACCESSOR
],
  bootstrap: [AppComponent]
})
export class AppModule { }
