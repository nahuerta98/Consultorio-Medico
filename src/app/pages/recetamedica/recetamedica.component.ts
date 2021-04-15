import { Component, OnInit } from '@angular/core';

import { PacientesServices } from '../../services/pacientes.service';
import { PacienteModel } from '../../models/paciente.model';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-recetamedica',
  templateUrl: './recetamedica.component.html',
  styleUrls: ['./recetamedica.component.sass']
})
export class RecetamedicaComponent implements OnInit {

  pacientes: PacienteModel[] = [];
  paciente = new PacienteModel();

  cargando = false;

  CurrentDate = new Date();

  constructor( private pacientesServices: PacientesServices ) { }

  ngOnInit(): void {

    this.cargando = true;

    this.pacientesServices.getPacientes()
      .subscribe(resp => {
        this.pacientes = resp;
        this.cargando = false;
      });

    this.imprimirReceta();
  }

  imprimirReceta(){

    let btnImprimir = $(".btn-imprimir");
    
    btnImprimir.click( function() {

      $(".main-page .itmMain:first-child").remove();
      $(".contenedor-general").css({
        "width":"100%"
      });      
      $(".main-page .itmMain:last-child").css({
        "max-width":"100%"
      });

      $( this ).remove();

      window.print();
      location.reload();
      return false;

    })

  }



}
