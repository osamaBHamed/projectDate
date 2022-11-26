import { Component, ViewEncapsulation } from '@angular/core';
import { FlatpickrDefaultsInterface } from './date-picker/FlatpickrDefaults';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  title = 'projectdate';
  dateTimeValue: Date = new Date();
  options: FlatpickrDefaultsInterface = {
    enable : [{from : new Date(0, 1), to : new Date(new Date().getFullYear() + 200, 12)}],
          altFormat: 'd/m/Y',   // will be ignored since altFormat is provided via specific attribute
          altInput: true        // will be used since specific attribute is not provided
     };
     timePicker: Date | null = null;

     xyz(x:any){
      debugger
      this.timePicker=x.selectedDates
     }
  
}
