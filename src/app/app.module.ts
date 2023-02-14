import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent, ChunkPipe, InCalenderRangePipe } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, ChunkPipe, InCalenderRangePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
