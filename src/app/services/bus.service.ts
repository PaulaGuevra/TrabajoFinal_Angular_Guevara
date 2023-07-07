import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Bus } from '../models/bus';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';


/* const busList: Bus[] =[
  new Bus (1, "HGF454",50, this.ModeloService.),
  new Bus (2, "JGF342",30,[),
  new Bus(3, "KGH679",20,),
]
 */
@Injectable({
  providedIn: 'root'
})
export class BusService {

  resourceUrl = environment.backendUrl + "colectivos";

  constructor(private http: HttpClient){}

  findAll(): Observable<Bus[]>{
    return this.http.get<any[]>(this.resourceUrl).pipe(
      catchError(err =>{
        console.log('Hubo un error');
        return throwError(()=> "Pasó algo")
      }),
      map(json => json.map(value => new Bus(value.id, value.patente, value.cantidadAsientos, value.modeloId)))
    )
  }
  findOne(id:number): Observable<Bus>{
    return this.http.get<any>(this.resourceUrl + '/' + id).pipe(
      catchError(err =>{
        console.log('Hubo un error');
        return throwError(()=> "El colectivo no existe")}),
        map(json => new Bus(json.id, json.patente, json.cantidadAsientos, json.modeloId))
    )
  } 

  crearBus(colectivo: ColectivosDTO): Observable<any>{
    return this.http.post<any>(this.resourceUrl, colectivo).pipe(
      catchError(err =>{
        console.log("Hubo un error.");
        return throwError(()=> "No se pudo crear el colectivo");
      })
    )
  }

  actualizarBus(colectivo: ColectivosDTO): Observable<any>{
    return this.http.put<any>(this.resourceUrl + '/'+ colectivo.id, colectivo).pipe(
      catchError(err =>{
        console.log("Hubo un error.");
        return throwError(()=> "El colectivo no existe.");
      })
    )
  }
  
  borrarBus(id:number): Observable<HttpResponse<any>>{
    return this.http.delete<any>(this.resourceUrl + '/' + id). pipe(
      catchError(err => {
        console.log("Hubo un error");
        return throwError(()=> "El colectivo no existe");
      })
      )
    }

}
 export interface ColectivosDTO{
  id?: number, 
  patente: string,
  cantidadAsientos: number,
  modeloId: number
 }