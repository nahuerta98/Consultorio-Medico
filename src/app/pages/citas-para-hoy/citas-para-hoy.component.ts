import { Component, OnInit } from '@angular/core';

import { CitaModel } from 'src/app/models/cita.model';
import { CitasServices } from 'src/app/services/citas.service';

import { CitaExamenModel } from 'src/app/models/citaExamen.model';
import { CitasExamenServices } from 'src/app/services/citaExamen.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-citas-para-hoy',
  templateUrl: './citas-para-hoy.component.html',
  styleUrls: ['./citas-para-hoy.component.sass']
})
export class CitasParaHoyComponent implements OnInit {

  CurrentDate = new Date();

  citas: CitaModel[] = [];

  citasExmn: CitaExamenModel[] = [];

  cargando = false;

  constructor(
    private citasService: CitasServices,
    private citasExamenesServices: CitasExamenServices
  ) { }

  ngOnInit(): void {
    this.cargando = true;

    this.cambiarPestanas();

    this.citasService.getCitas()
      .subscribe(resp => {
        this.citas = resp;
        this.cargando = false;
      });


    this.citasExamenesServices.getCitas()
      .subscribe(resp => {
        this.citasExmn = resp;
        this.cargando = false;
      });

  }

  cambiarPestanas() {

    let BTN = $('#botonesCitasHoy a');
    let BLOQUE = $('.bloquesCitasparaHoy');

    BTN.click(function () {

      let INDEX = BTN.index($(this));
      console.log(INDEX);
      BTN.removeClass('active');
      BTN.eq(INDEX).addClass('active');
      BLOQUE.removeClass('active');
      BLOQUE.eq(INDEX).addClass('active');

    });

  }

}
