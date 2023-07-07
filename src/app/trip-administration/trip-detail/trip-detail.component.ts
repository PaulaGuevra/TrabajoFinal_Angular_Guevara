import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from 'src/app/services/bus.service';
import { Bus } from 'src/app/models/bus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/models/person';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { PersonService, PersonDTO } from 'src/app/services/person.service';
import { TripService, TripDTO } from 'src/app/services/trip.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Trip } from 'src/app/models/trip';



@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  selectedTrip: Trip | null = null;
  busList: Bus[] = [];
  personList: Person[] = [];

  tripForm: FormGroup = this.fb.group({
    origen:['', Validators.required],
    destino: ['', Validators.required],
    fechaSalida:[new Date(),Validators.required],
    fechaLlegada:[new Date(), Validators.required],
    colectivo:[0,Validators.required],
    pasajeros: [[],Validators.required]
  })


  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private  modeloService: ModeloService,
    private matSnackBar: MatSnackBar,
    private personService: PersonService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(){

    this.route.paramMap.subscribe(params => {
      const id = params.get("id")
      console.log("El id que estoy editando es: " + id);
      if (id) {
        // @ts-ignore
        this.findTrip(Number(id));
      }
    });

    this.busService.findAll().subscribe(res => {
      this.busList = res.map(json =>{
        const bus= new Bus(json.id, json.patente, json.cantidadAsientos,json.modeloId);
        this.findModeloColectivo(bus);
        return bus;
      });
    }, error =>{
      console.log(error);
      this.matSnackBar.open(error,"Cerrar")
    })
    
    this.personService.findAll().subscribe(res=>{
      this.personList= res.map(json => new Person(json.id, json.name, json.lastName, json.age));
    })

    
  }

  findTrip(id: number) {
    this.tripService.findOne(id).subscribe(res => {
      this.selectedTrip = res;
      this.tripForm.patchValue({
        origen: res.lugarSalida,
        destino: res.lugarDestino,
        fechaSalida: new Date(res.fechaSalida),
        fechaLlegada: new Date(res.fechaLlegada),
        colectivo: res.idColectivo,
      });
      //@ts-ignore
      this.tripForm.get('pasajeros').setValue(res.personaId);
    }, error =>{
      console.error(error);
      this.matSnackBar.open("El viaje no existe.", "Cerrar");
      this.router.navigate(['viajes', 'list'])
    })
  }



  findModeloColectivo(colectivo:Bus){
    this.modeloService.findOne(colectivo.modeloId).subscribe(res=>{
      colectivo.modelo = new Modelo(res.id, res.nombre, res.marca);
    });
  }

  guardarCambios(){
     //@ts-ignore;
      const pasajeros: number[] = this.tripForm.get('pasajeros')?.value;

      const body: TripDTO = {
      //@ts-ignore;
      lugarSalida: this.tripForm.get('origen')?.value,
      lugarDestino: this.tripForm.get('destino')?.value,
      fechaSalida: this.tripForm.get('fechaSalida')?.value,
      fechaLlegada: this.tripForm.get('fechaLlegada')?.value,
      personaId: pasajeros,
      idColectivo: this.tripForm.get('colectivo')?.value
    }

    if(this.selectedTrip && this.selectedTrip.id){
      //llamar al metodo actualizar
      console.log("Actualizando informacion del viaje...")
      body.id = this.selectedTrip.id;
      this.tripService.actualizarViaje(body).subscribe( res=> {
        this.matSnackBar.open("Se guardaron los cambios del viaje.", "Cerrar");
        this.router.navigate(['viajes', 'list']);
      }, error =>{
        console.log(error);
        this.matSnackBar.open(error,"Cerrar");
      });
    } else{
      //llamar al método crear
      this.tripService.crearViaje(body).subscribe(res=>{
        this.matSnackBar.open("El viaje se creo con exito!","Cerrar");
        this.router.navigate(['viajes', 'list']);
      }, error =>{
        console.log(error);
        this.matSnackBar.open("Hubo un error", "Cerrar");
      });
    }
  }

  compareObjects(o1: any, o2: any) {
    if(o1 && o2 && o1.id == o2.id)
      return true;

    else
      return false
  }

  volverAtras(){
    this.router.navigate(['viajes', 'list'])
  }

}
