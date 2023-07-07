import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

/* const listado: Person[]= [
  new Person(1, "Pau", "Guevara", 31),
  new Person(2, "Pedrito", "Sanchez", 1),
  new Person(3, "Marian", "Sanchez", 30),
  new Person(4, "Lucía", "Guevara", 17)
  ] */

@Injectable({
  providedIn: 'root'
})
export class PersonService {
 
  resourceUrl = environment.backendUrl + "personas";

  constructor( private http: HttpClient){}

  findAll() : Observable <Person[]>{
    return this.http.get<any[]>(this.resourceUrl). pipe(
      catchError(err => {
        console.log("Hubo un error");
        return throwError(()=> "Hubo un error");
      }),
      map(json => json.map(value => new Person(value.id, value.name, value.lastName, value.age)))
    )
  };
  findOne(id:number): Observable<Person>{
    return this.http.get<any>(this.resourceUrl + '/' + id). pipe(
    catchError(err => {
      console.log("Hubo un error");
      return throwError(()=> "La persona no existe");
    }),
    map(json => new Person(json.id, json.name, json.lastName, json.age)))
  }

  crearPersona(persona:PersonDTO): Observable<any>{
    return this.http.post<any>(this.resourceUrl, persona).pipe(
      catchError( err =>{
        console.log("Hubo un error.");
        return throwError(()=> "La persona no pudo ser creada.");
      })
    )
  }

  actualizarPersona(persona:PersonDTO): Observable<any>{
    return this.http.put<any>(this.resourceUrl + '/' + persona.id, persona).pipe(
      catchError( err =>{
        console.log("Hubo un error.");
        return throwError(()=> "La persona no existe.");
      })
    )
  }

  borrarPersona(id:number): Observable<HttpResponse<any>>{
    return this.http.delete<any>(this.resourceUrl + '/' + id). pipe(
      catchError(err => {
        console.log("Hubo un error");
        return throwError(()=> "La persona no existe");
      })
      )
    }

}

export interface PersonDTO{
  
  id?: number,
  name: string,
  lastName: string,
  age: number
}