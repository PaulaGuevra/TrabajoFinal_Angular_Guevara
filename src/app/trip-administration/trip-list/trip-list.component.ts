import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/services/trip.service';
import { BusService } from 'src/app/services/bus.service';
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  displayedColumns = ['id', 'lugarSalida', 'lugarDestino', 'fechaLlegada', 'fechaSalida', 'colectivo', 'acciones'];
  dataSource = [
    new Trip(1, 'Viedma', 'Patagones', '2023-06-29', '2023-06-29', 1)
  ];

  tripList: Trip[] = [];
  //@ts-ignore
  selectedTrip: Trip = null;

  constructor(private tripService: TripService,
              private busService: BusService,
              private router: Router,
              private matSnackBar: MatSnackBar
              ) {
  }

  ngOnInit() {
    this.loadTrip();
  }

  loadTrip(){
    this.tripService.findAll().subscribe(res => {
      this.dataSource = res.map(res => {
       const trip = new Trip(res.id, res.lugarSalida,res.lugarDestino, res.fechaLlegada, 
        res.fechaSalida, res.idColectivo);
        this.loadColectivo(trip);
        return trip;
      });
    })
  }

  loadColectivo(trip: Trip) {
    this.busService.findOne(trip.idColectivo).subscribe(res => {
      trip.colectivo = res;
    })
  }

  crearViaje(){
    this.router.navigate(['viajes', 'create'])
  }

  editarTrip(trip: Trip) {
    this.router.navigate(['viajes', 'detail', trip.id]);
  }

  borrarTrip(trip: Trip){
    this.tripService.borrarViaje(trip.id).subscribe( res =>{
      this.matSnackBar.open("Viaje borrado exitosamente.", "Cerrar");
      this.loadTrip();
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }


}


