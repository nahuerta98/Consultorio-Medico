import { Component, OnInit } from '@angular/core';

import { ExamenesServices } from '../../services/examenes.service';
import { ExamenModel } from '../../models/examen.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.sass']
})
export class ExamenesComponent implements OnInit {

  examenes: ExamenModel[] = [];

  cargando = false;

  constructor(

    private examenesServices: ExamenesServices

  ) { }

  ngOnInit(): void {

  this.cargando = true;

  this.examenesServices.getExamenes()
    .subscribe(resp => {
      this.examenes = resp;
      this.cargando = false;
    });

  }

  borrarExamen(examen: ExamenModel, i: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Esta seguro que desea borrar ${examen.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.examenes.splice(i, 1);
        this.examenesServices.borrarExamen(examen.id).subscribe();
      }

    });

  }

}
