import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PacienteModel } from '../models/paciente.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class PacientesServices {

	private url = 'https://loginapp-51f32.firebaseio.com';

	constructor(private http: HttpClient) { }

	crearPaciente(paciente: PacienteModel) {

		return this.http.post(`${this.url}/pacientes.json`, paciente)
			.pipe(
				map((resp: any) => {
					paciente.id = resp.name;
					return paciente;
				})
			);
	}

	actualizarPaciente(paciente: PacienteModel) {
		const pacienteTemp = {
			...paciente
		};

		delete pacienteTemp.id;

		return this.http.put(`${this.url}/pacientes/${paciente.id}.json`, pacienteTemp);

	}

	borrarPaciente(id: string) {
		return this.http.delete(`${this.url}/pacientes/${id}.json`);
	}

	getPaciente(id: string) {
		return this.http.get(`${this.url}/pacientes/${id}.json`);
	}

	getPacientes() {
		return this.http.get(`${this.url}/pacientes.json`)
			.pipe(

				map(this.crearArreglo),
				delay(500)

			);
	}

	private crearArreglo(pacientesObj: Object) {

		const PACIENTES: PacienteModel[] = []

		console.log(pacientesObj);

		if (pacientesObj === null) { return []; }

		Object.keys(pacientesObj).forEach(key => {
			const PACIENTE: PacienteModel = pacientesObj[key];
			PACIENTE.id = key;

			PACIENTES.push(PACIENTE);
		});

		return PACIENTES;

	}



}

