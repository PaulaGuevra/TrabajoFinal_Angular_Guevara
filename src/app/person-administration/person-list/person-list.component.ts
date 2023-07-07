import { Component, OnInit } from '@angular/core';;
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  personList: Person[] = [];
  //@ts-ignore;
  selectedPerson: Person = null;

  constructor(private personService: PersonService,
    private router: Router,
    private matSnackBar: MatSnackBar){}

  ngOnInit(){
    this.loadPerson();
  
  }
  loadPerson(){
    this.personService.findAll().subscribe(res => {
      this.personList = res;
    }, error =>{
      console.log(error);
    });
  }
  
  crearPersona(){
    this.router.navigate(['person','create'])
  }

  seleccionarPersona(persona:Person) {
    this.router.navigate(['person', 'detail', persona.id]);
  }

  borrarPersona(persona: Person){
    this.personService.borrarPersona(persona.id).subscribe( res =>{
      this.matSnackBar.open("Persona borrada exitosamente.", "Cerrar");
      this.loadPerson();
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
    

  }

}
