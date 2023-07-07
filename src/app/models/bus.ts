import { Modelo } from "./modelo";

export class Bus {
    id: number;
    patente: string;
    cantidadAsientos: number;
    modeloId: number;
    modelo: Modelo | undefined;
   

    constructor(id:number,patente:string, cantidadAsientos: number, modeloId: number){
        this.id = id;
        this.patente = patente;
        this.cantidadAsientos=cantidadAsientos;
        this.modeloId = modeloId;
        

    }
    getBus(){
        return this.id+ " " + this.patente+ " " +this.cantidadAsientos+ " "+this.modeloId;

    }

    

    
}
