import { Component, OnInit } from '@angular/core';

import { CitaExamenModel } from 'src/app/models/citaExamen.model';
import { CitasExamenServices } from 'src/app/services/citaExamen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda-examenes',
  templateUrl: './agenda-examenes.component.html',
  styleUrls: ['./agenda-examenes.component.sass']
})
export class AgendaExamenesComponent implements OnInit {

  citas: CitaExamenModel[] = [];

  cargando = false;

  constructor( private citasExamenesServices: CitasExamenServices ) { }

  ngOnInit(): void {
    this.cargando = true;

    this.citasExamenesServices.getCitas()
      .subscribe(resp => {
        this.citas = resp;
        this.cargando = false;
      });
  }

  borrarCita(cita: CitaExamenModel, i: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.citas.splice(i, 1);
        this.citasExamenesServices.borrarCita(cita.id).subscribe();
      }

    });

  }

}
