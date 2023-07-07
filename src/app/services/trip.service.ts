import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  resourceUrl = environment.backendUrl + 'viajes';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any[]>{
    return this.http.get<any[]>(this.resourceUrl).pipe(
      catchError(err=>{
        console.log("Hubo un error,");
        return throwError(()=> "Hubo un error,");
      }),
      map(json => json.map(value => new Trip(value.id, value.lugarSalida, value.lugarDestino, value.fechaSalida, value.fechaLlegada, value.idColectivo)))
    );
  }

  findOne(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un error');
      }), 
    );
  }

  crearViaje(trip: TripDTO): Observable<any>{
    return this.http.post<any>(this.resourceUrl, trip). pipe(
      catchError(err =>{
        console.log("Hubo un error: ");
        console.log(err);
        return throwError(()=>"No se pudo crear el viaje.");
      })
    );

  }

  actualizarViaje(trip: TripDTO): Observable<any>{
    return this.http.put<any>(this.resourceUrl + '/' + trip.id, trip).pipe(
      catchError(err =>{
        console.log("Hubo un error,");
        console.log(err);
        return throwError(()=>"El viaje no existe.");
      })
    )
  }

  borrarViaje(id:number): Observable<HttpResponse<any>>{
    return this.http.delete<any>(this.resourceUrl + '/' + id). pipe(
      catchError(err => {
        console.log("Hubo un error");
        return throwError(()=> "El viaje no existe");
      })
      )
    }

}
  
export interface TripDTO{
    id?: number;
    lugarSalida: string;
    lugarDestino: string;
    fechaSalida: Date,
    fechaLlegada: Date,
    personaId: number[];
    idColectivo?: number
  }


