import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { CitaModel } from '../models/cita.model';

@Injectable({
	providedIn: 'root'
})

export class CitasServices {

    private url = 'https://loginapp-51f32.firebaseio.com';

    constructor(private http: HttpClient) { }

	crearCita(cita: CitaModel) {

		return this.http.post(`${this.url}/citas.json`, cita)
			.pipe(
				map((resp: any) => {
					cita.id = resp.name;
					return cita;
				})
			);
    }
    
	actualizarCita( cita: CitaModel ) {
		const citaTemp = {
			...cita
		};

		delete citaTemp.id;

		return this.http.put(`${this.url}/citas/${cita.id}.json`, citaTemp);

    }
    
	borrarCita(id: string) {
		return this.http.delete(`${this.url}/citas/${id}.json`);
    }
    
	getCita(id: string) {
		return this.http.get(`${this.url}/citas/${id}.json`);
	}    
    
	getCitas() {
		return this.http.get(`${this.url}/citas.json`)
			.pipe(

				map(this.crearArreglo),
				delay(500)

			);
    }
    
	private crearArreglo(citasObj: Object) {

		const CITAS: CitaModel[] = []

		console.log(citasObj);

		if (citasObj === null) { return []; }

		Object.keys(citasObj).forEach(key => {
			const CITA: CitaModel = citasObj[key];
			CITA.id = key;

			CITAS.push(CITA);
		});

		return CITAS;

	}

}


