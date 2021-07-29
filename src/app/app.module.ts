import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PieChartComponent } from './components/pie-chart.component';
import { BarChartComponent } from './components/bar-chart.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BarChartComponent, PieChartComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
