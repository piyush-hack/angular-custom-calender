import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DateRangePickerComponent, DateRangePickerWrapperComponent, DateTimeRangePickerComponent, TimePickerComponent } from './date-time-range-picker';
import { ChunkPipe, InCalenderRangePipe } from './utils';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DateRangePickerWrapperComponent,DateTimeRangePickerComponent, DateRangePickerComponent, TimePickerComponent , ChunkPipe , InCalenderRangePipe ],
  bootstrap: [AppComponent],
})
export class AppModule {}
