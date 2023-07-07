import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripAdministrationRoutingModule } from './trip-administration-routing.module';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TripListComponent } from './trip-list/trip-list.component';



@NgModule({
  declarations: [
    TripDetailComponent,
    TripListComponent
  ],
  imports: [
    CommonModule,
    TripAdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  
  ]
})
export class TripAdministrationModule { }
