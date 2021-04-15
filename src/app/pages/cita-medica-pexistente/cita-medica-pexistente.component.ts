import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { PacientesServices } from '../../services/pacientes.service';
import { PacienteModel } from '../../models/paciente.model';

import { CitasServices } from 'src/app/services/citas.service';
import { CitaModel } from '../../models/cita.model';

import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-cita-medica-pexistente',
  templateUrl: './cita-medica-pexistente.component.html',
  styleUrls: ['./cita-medica-pexistente.component.sass']
})
export class CitaMedicaPexistenteComponent implements OnInit {
  cita = new CitaModel();

  pacientes: PacienteModel[] = [];
  paciente = new PacienteModel();

  cargando = false;

  public href: string = " ";

  constructor(
    private citasService: CitasServices,
    private route: ActivatedRoute,
    private router: Router,
    private pacientesServices: PacientesServices
  ) { }

  ngOnInit(): void {

    this.cargando = true;

    const id = this.route.snapshot.paramMap.get('id');

    this.magicScript();

    if (id !== 'nuevo') {
      this.citasService.getCita(id)
        .subscribe((resp: CitaModel) => {
          this.cita = resp;
          this.cita.id = id;
        });
    }

    this.pacientesServices.getPacientes()
      .subscribe(resp => {
        this.pacientes = resp;
        this.cargando = false;
      });


  }

  guardarCita(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.cita.id) {
      peticion = this.citasService.actualizarCita(this.cita)
    } else {
      peticion = this.citasService.crearCita(this.cita)
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: 'Se actualizo la informacion correctamente',
        text: 'Regresando a la lista de citas',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Cerrar'
      });


      window.location.href = '#/todas-las-citas';


    });

  }


  magicScript(){

    let btnNuevoPaciente = $("#btnNuevoPaciente");
    let btnSecond = $("a.second");
    let btn = $(".botonEscondido");
    let inputs = $(".formulario form .form-control");
    let btnGuardar = $("#botonGuardarCambios");

    btn.hide();

    this.href = this.router.url;


    if ( this.href !== '/cita-paciente-existente/nuevo' ) {
      btn.show().addClass("active");
      inputs.attr("disabled", "disabled");
      btnGuardar.hide();
      btnNuevoPaciente.remove();
      btnSecond.hide();
    }

    btn.click( function() {

      Swal.fire({
        title: "¿Habilitar edicion?",
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Edicion habilitada.',
            'Al terminar presione el boton de guardar.',
            'success',
          )
          $(this).hide();
          inputs.removeAttr("disabled");
          btnGuardar.show().text("Guardar").prepend('<i class="fas fa-save"></i>');
          $(".seleccionar-vista").remove();
        }
      });
    });



  }



}
