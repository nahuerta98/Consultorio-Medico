import { Component, OnInit } from '@angular/core';

import { PacientesServices } from '../../services/pacientes.service';
import { PacienteModel } from '../../models/paciente.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.sass']
})
export class PacientesComponent implements OnInit {

  pacientes: PacienteModel[] = [];

  cargando = false;

  constructor( private pacientesServices: PacientesServices ) { }

  ngOnInit(): void {
    this.cargando = true;

    this.pacientesServices.getPacientes()
      .subscribe(resp => {
        this.pacientes = resp;
        this.cargando = false;
      });
  }

  borrarPaciente(paciente: PacienteModel, i: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Esta seguro que desea borrar a ${paciente.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.pacientes.splice(i, 1);
        this.pacientesServices.borrarPaciente(paciente.id).subscribe();
      }

    });

  }


}
