import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonAdministrationModule } from './person-administration/person-administration.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLayoutModule } from './shared/admin-layout/admin-layout.module';
import { BusAdministrationModule } from './bus-administration/bus-administration.module';
import { HttpClientModule } from '@angular/common/http';
import { TripAdministrationModule } from './trip-administration/trip-administration.module';
import { SliderModule } from './slider/slider.module';


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PersonAdministrationModule,
    BrowserAnimationsModule,
    AdminLayoutModule,
    BusAdministrationModule,
    TripAdministrationModule,
    SliderModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
