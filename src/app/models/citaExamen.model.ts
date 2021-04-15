export class CitaExamenModel{
	id: string;
	paciente: string;
	tipoexamen: string;
	fecha: string;
	pagado: boolean;
	tipoCita: string;

	constructor(){
		this.pagado = false;
		this.tipoCita = 'citaExamen';
	}	

}