import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusDetailComponent } from './bus-detail/bus-detail.component';
import { BusListComponent } from './bus-list/bus-list.component';

const routes: Routes = [
  { path:'', redirectTo:"list",pathMatch:"full" },
  { path:'list', component: BusListComponent},
  { path: 'detail/:id', component: BusDetailComponent},
  { path: 'create', component: BusDetailComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusAdministrationRoutingModule { }
