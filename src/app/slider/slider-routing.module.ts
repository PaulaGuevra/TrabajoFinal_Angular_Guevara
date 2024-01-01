import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
const routes: Routes = [
    { path:'', redirectTo:"slider",pathMatch:"full" },
    { path: 'slider', component: SliderComponent}
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SliderRoutingModule { }