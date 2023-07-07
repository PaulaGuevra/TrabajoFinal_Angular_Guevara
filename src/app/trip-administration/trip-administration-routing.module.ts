import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TripDetailComponent} from './trip-detail/trip-detail.component';
import { TripListComponent } from './trip-list/trip-list.component'
const routes: Routes = [
  { path:'', redirectTo:"list",pathMatch:"full" },
  { path:'list', component: TripListComponent},
  { path: 'detail/:id', component: TripDetailComponent},
  { path: 'create', component: TripDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripAdministrationRoutingModule { }
