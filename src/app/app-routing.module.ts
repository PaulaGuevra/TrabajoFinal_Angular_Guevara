import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/admin-layout/layout/layout.component';


const routes: Routes = [
  { path: '',redirectTo: 'person', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'person',
        loadChildren: () => 
        import('./person-administration/person-administration.module').then(mod => mod.PersonAdministrationModule)
      },
      {
        path: 'colectivos',
        loadChildren: () => 
        import('./bus-administration/bus-administration.module').then(mod => mod.BusAdministrationModule)
      },
      {
        path: 'viajes',
        loadChildren: () => 
        import('./trip-administration/trip-administration.module').then(mod => mod.TripAdministrationModule)
      }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
