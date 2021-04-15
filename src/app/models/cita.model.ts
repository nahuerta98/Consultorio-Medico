export class CitaModel {

    id: string;
    nombre: string;
    fecha: string;
    sintomas: string;
    tipoCita: string;
    acudio: boolean;

    constructor(){
        this.acudio = false;
        this.tipoCita = 'citaNormal';
    }


}