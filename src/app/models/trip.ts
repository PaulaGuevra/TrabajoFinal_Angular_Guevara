import { Bus } from "./bus";

export class Trip {
    id: number;
    lugarSalida: string;
    lugarDestino: string;
    fechaSalida: Date;
    fechaLlegada: Date;
    //@ts-ignore
    personaId: number = [];
    idColectivo: number;
    colectivo: Bus | null = null;

    constructor(id:number, lugarSalida:string, lugarDestino: string,
         fechaSalida:string, fechaLlegada:string,idColectivo: number){
            this.id = id;
            this.lugarSalida = lugarSalida;
            this.lugarDestino = lugarDestino;
            this.fechaSalida = new Date(fechaSalida);
            this.fechaLlegada = new Date(fechaLlegada);
            this.idColectivo = idColectivo;

         }

}
