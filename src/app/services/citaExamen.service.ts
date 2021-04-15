import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { CitaExamenModel } from '../models/citaExamen.model';

@Injectable({
	providedIn: 'root'
})

export class CitasExamenServices {

	private url = 'https://loginapp-51f32.firebaseio.com';

	constructor(private http: HttpClient) { }

	crearCita(cita: CitaExamenModel) {

		return this.http.post(`${this.url}/agendaexamenes.json`, cita)
			.pipe(
				map((resp: any) => {
					cita.id = resp.name;
					return cita;
				})
			);
	}

	actualizarCita(cita: CitaExamenModel) {
		const citaTemp = {
			...cita
		};

		delete citaTemp.id;

		return this.http.put(`${this.url}/agendaexamenes/${cita.id}.json`, citaTemp);

	}

	borrarCita(id: string) {
		return this.http.delete(`${this.url}/agendaexamenes/${id}.json`);
	}

	getCita(id: string) {
		return this.http.get(`${this.url}/agendaexamenes/${id}.json`);
	}

	getCitas() {
		return this.http.get(`${this.url}/agendaexamenes.json`)
			.pipe(

				map(this.crearArreglo),
				delay(500)

			);
	}

	private crearArreglo(citasObj: Object) {

		const CITAS: CitaExamenModel[] = []

		console.log(citasObj);

		if (citasObj === null) { return []; }

		Object.keys(citasObj).forEach(key => {
			const CITA: CitaExamenModel = citasObj[key];
			CITA.id = key;

			CITAS.push(CITA);
		});

		return CITAS;

	}

}


