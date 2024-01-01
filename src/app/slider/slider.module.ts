import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { MatCardModule } from '@angular/material/card';
import { SliderRoutingModule } from './slider-routing.module';

@NgModule({
  declarations: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SliderRoutingModule
  ]
})
export class SliderModule { }
