import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService, ColectivosDTO } from 'src/app/services/bus.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusListComponent } from '../bus-list/bus-list.component';



@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css']
})
export class BusDetailComponent implements OnInit {

  selectedBus: Bus | null = null;
  
  busForm: FormGroup = this.fb.group({
    patente:['', Validators.required],
    cantidadAsientos: [0,[Validators.required, Validators.min(10), Validators.max(80)]],
    modeloId: ['', Validators.required]
  })

  constructor(
    private busService: BusService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    ) {}
  
  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      const id= params.get("id")
      console.log("el busId que se está editando es: " + id);
      if (id){
        this.findBus(Number(id));
      }
    });
  }

  findBus(id:number){
  
    this.busService.findOne(id).subscribe(res=>{
        this.selectedBus=res;
        this.busForm.patchValue({
        patente: this.selectedBus.patente,
        cantidadAsientos :this.selectedBus.cantidadAsientos,
        modeloId: this.selectedBus.modeloId
      })
    }, error =>{
      console.error(error);
      this.matSnackBar.open("El colectivo no existe.", "Cerrar");
      this.router.navigate(['colectivos', 'list'])
    });
  }

  guardarCambios(){

    const body: ColectivosDTO ={
      //@ts-ignore;
      id:null,
      patente:this.busForm.get('patente')?.value,
      cantidadAsientos: this.busForm.get('cantidadAsientos')?.value,
      modeloId: this.busForm.get('modeloId')?.value
    }

    if(this.selectedBus && this.selectedBus.id){
      //llamar al metodo actualizar
      console.log("Actualizando un colectivo...");
      body.id = this.selectedBus.id;

      this.busService.actualizarBus(body).subscribe( res =>{
        this.matSnackBar.open("Se guardaron los cambios en el colectivo", "Cerrar");
        this.router.navigate(['colectivos', 'list']);
      }, error =>{
        console.log(error);
        this.matSnackBar.open(error,"Cerrar")
      })
    } else {
      //llamar al metodo crear
      console.log("Creando un nuevo colectivo...");
      this.busService.crearBus(body).subscribe(res =>{
        this.matSnackBar.open("Colectivo creado correctamente","Cerrar");
        this.router.navigate(['colectivos', 'list']);
      }, error =>{
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      })
    }
    console.log("Patente: " + this.busForm.get('patente')?.value);
    console.log("Cantidad de asientos: " + this.busForm.get('cantadAsientos')?.value);
    console.log("Modelo: " + this.busForm.get('modelo')?.value)
  }
  volverAtras(){
    this.router.navigate(['colectivos', 'list'])
  }
  
  


}
