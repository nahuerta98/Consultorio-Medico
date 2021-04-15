import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

import { ExamenModel } from '../models/examen.model';

@Injectable({
	providedIn: 'root'
})

export class ExamenesServices {

	private url = 'https://loginapp-51f32.firebaseio.com';

	constructor(private http: HttpClient) { }

	crearExamen(examen: ExamenModel) {
		return this.http.post(`${this.url}/examenes.json`, examen)
			.pipe(
				map((resp: any) => {
					examen.id = resp.name;
					return examen;
				})
			);
	}

	actualizarExamen(examen: ExamenModel) {
		const examenTemp = {
			...examen
		};

		delete examenTemp.id;

		return this.http.put(`${this.url}/examenes/${examen.id}.json`, examenTemp);

	}

	borrarExamen(id: string) {
		return this.http.delete(`${this.url}/examenes/${id}.json`);
	}

	getExamen(id: string) {
		return this.http.get(`${this.url}/examenes/${id}.json`);
	}

	getExamenes() {
		return this.http.get(`${this.url}/examenes.json`)
			.pipe(

				map(this.crearArreglo),
				delay(500)

			);
	}

	private crearArreglo(examenesObj: Object) {

		const EXAMENES: ExamenModel[] = []

		console.log(examenesObj);

		if (examenesObj === null) { return []; }

		Object.keys(examenesObj).forEach(key => {
			const EXAMEN: ExamenModel = examenesObj[key];
			EXAMEN.id = key;

			EXAMENES.push(EXAMEN);
		});

		return EXAMENES;

	}


}


