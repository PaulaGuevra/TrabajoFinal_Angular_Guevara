import { Component, OnInit} from '@angular/core';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { Router } from '@angular/router'; 
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule]
})
export class BusListComponent implements OnInit {

  displayedColumns = ['id', 'patente', 'cantidadAsientos', 'modeloId', 'acciones'];
  dataSource = [
    new Bus(1, "AB175CD", 50,1)
  ];

  busList: Bus[] = [];
  //@ts-ignore
  selectedBus: Bus = null;

  constructor(private router :Router, 
    private busService :BusService,
    private matSnackBar: MatSnackBar) {}

   
  ngOnInit(){
   this.loadBus();
  }

  loadBus(){
    this.busService.findAll().subscribe(res =>{
      this.dataSource = res.map(res => {
        const bus = new Bus(res.id, res.patente, res.cantidadAsientos,res.modeloId); 
        return bus;
      });
    }, error => { console.log(error)});
  }


  crearBus(){
    this.router.navigate(['colectivos', 'create'])
  }
  
  seleccionarBus(b : Bus){
    this.router.navigate(['colectivos','detail',b.id])
  }

  borrarBus(bus: Bus){
    this.busService.borrarBus(bus.id).subscribe( res =>{
      this.matSnackBar.open("Colectivo borrado exitosamente.", "Cerrar");
      this.loadBus();
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }

}
