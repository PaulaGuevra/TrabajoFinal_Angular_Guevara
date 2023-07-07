import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

/* const modelList: Modelo [] = [
  new Modelo(1, "Modelo A", "scania"),
  new Modelo(2,"Modelo B","peugeot"),
  new Modelo(3,"Modelo C","ford")
] */

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  resourceUrl = environment.backendUrl + "modelos";
  constructor( private http: HttpClient) { }

  findAll(): Observable<Modelo[]>{
    return this.http.get<any[]>(this.resourceUrl).pipe(
      catchError(err =>{
        console.log('Hubo un error');
        return throwError(()=> "Pasó algo")
      })
    )
  }
  findOne(id:number): Observable<Modelo>{
    return this.http.get<any>(this.resourceUrl + '/' + id).pipe(
      catchError(err =>{
        console.log('Hubo un error');
        return throwError(()=> "El modelo no existe")
      }),
      map(json => new Modelo(json.id,json.nombre, json.marca)))
  } 
}
  