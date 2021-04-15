import { Component, OnInit } from '@angular/core';

import { CitaModel } from 'src/app/models/cita.model';
import { CitasServices } from 'src/app/services/citas.service';

import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.sass']
})
export class VerCitasComponent implements OnInit {

  citas: CitaModel[] = [];

  cargando = false;

  constructor( private citasService: CitasServices ) { }

  ngOnInit(): void {

    this.cargando = true;

    this.citasService.getCitas()
      .subscribe(resp => {
        this.citas = resp;
        this.cargando = false;
      });

    this.cambiarPestanas();

  }


  borrarCita(cita: CitaModel, i: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.citas.splice(i, 1);
        this.citasService.borrarCita(cita.id).subscribe();
      }

    });

  }

  cambiarPestanas(){

    let BTN = $('#botonesListaCitas a');
    let BLOQUE = $('.bloquesListaCitas');

    BTN.click(function(){

      let INDEX = BTN.index($(this));
      console.log(INDEX);
      BTN.removeClass('active');
      BTN.eq(INDEX).addClass('active');
      BLOQUE.removeClass('active');
      BLOQUE.eq(INDEX).addClass('active');

    });

  }


}







