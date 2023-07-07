import { Component, OnInit} from '@angular/core';
import {Person} from "../../models/person";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, PersonDTO } from 'src/app/services/person.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  selectedPerson: Person | null = null;
  
  personForm: FormGroup = this.fb.group({
    name:['', Validators.required],
    lastName: ['', Validators.required],
    age:[0, [Validators.required, Validators.min(0), Validators.max(100)]]
  })

  constructor(private personService : PersonService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private _location: Location,
              private router: Router,
              private matSnackBar: MatSnackBar){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get("id")
      console.log("el id que se esta editando es : " + id);
      if (id){
        this.findPerson(Number(id));
      }
    });
}

  findPerson(id: number){
    this.personService.findOne(id).subscribe(res => {
      this.selectedPerson = res;
      
      this. personForm.patchValue({
        name: this.selectedPerson.name,
        lastName: this.selectedPerson.lastName,
        age: this.selectedPerson.age
      })
    }, error => {
      console.log(error);
      this.matSnackBar.open("La persona no existe.", "Cerrar");
      this.router.navigate(['person','list'])
    })
  }

  

  guardarCambios(){

    const body: PersonDTO = {
      //@ts-ignore;
      id: null,
      name: this.personForm.get('name')?.value,
      lastName: this.personForm.get('lastName')?.value,
      age: this.personForm.get('age')?.value
    }

    if (this.selectedPerson && this.selectedPerson.id){
      //llamar al metodo actualizar
      console.log("Actualizando una persona");

      body.id = this.selectedPerson.id;
     
      this.personService.actualizarPersona(body).subscribe( res=>{
        this.matSnackBar.open('Se guardaron los cambios en la persona', 'Cerrar');
        this.router.navigate(['person', 'list']);
      }, error =>{
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      })
    } else {
      // llamar metodo crear
      console.log("Se está creando una persona");
      this.personService.crearPersona(body).subscribe( res=>{
        this.matSnackBar.open('Persona creada exitosamente.', 'Cerrar');
        this.router.navigate(['person', 'list']);
      }, error =>{
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      })

     }
    console.log("Nombre: " + this.personForm.get('name')?.value);
    console.log("Apellido: " + this.personForm.get('lastName')?.value);
    console.log("Edad: " + this.personForm.get('age')?.value);
  }

  volverAtras(){
    this.router.navigate(['person', 'list'])
  }
}
  


  

