import { Component } from '@angular/core';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent {

  personList: Person [] = [
    new Person("Pedro", "Sanchez", 1),
    new Person("Mariano", "Sanchez", 30),
    new Person("Paula", "Guevara", 31)
  ];
  selectedPerson: Person | null = null;

  seleccionarPersona(persona:Person) {
    this.selectedPerson = persona;
  }

}
