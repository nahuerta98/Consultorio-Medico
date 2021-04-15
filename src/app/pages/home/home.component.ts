import { Component, OnInit } from '@angular/core';
import { CitasServices } from '../../services/citas.service';
import { CitaModel } from '../../models/cita.model';

import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  slideConfig = { 
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  citas: CitaModel[] = [];

  cargando = false;

  CurrentDate = new Date();

  public href: string = "";

  constructor(
    private pacientesServices: CitasServices,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cargando = true;

    this.pacientesServices.getCitas()
      .subscribe(resp => {
        this.citas = resp;
        this.cargando = false;
      });


  }

  actualizarPaciente(
    cita: CitaModel, i: number
  ) {

    let x = $(".card-paciente");


    Swal.fire({
      title: '¿El paciente acudió?',
      text: '',
      icon: 'question' ,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(resp => {

      if (resp.value){

        window.location.href = ` #/cita-paciente-existente/${cita} `;
        location.reload();


      } else {

        Swal.fire({

          title: '¿Que desea hacer?',
          icon: 'question',
          showConfirmButton: true,
          confirmButtonText: 'Editar cita',
          showCancelButton: true,
          cancelButtonText: 'Cerrar'

        }).then(respuesta => {

          if(respuesta.value){

            window.location.href = ` #/cita-paciente-existente/${cita} `;
            location.reload();

          }

        })

      }

    });

  }

  


}
