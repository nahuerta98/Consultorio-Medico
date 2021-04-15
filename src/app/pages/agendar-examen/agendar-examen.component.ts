import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { CitaExamenModel } from '../../models/citaExamen.model';
import { CitasExamenServices } from '../../services/citaExamen.service';

import { PacientesServices } from '../../services/pacientes.service';
import { PacienteModel } from '../../models/paciente.model';

import { ExamenesServices } from '../../services/examenes.service';
import { ExamenModel } from '../../models/examen.model';

import Swal from 'sweetalert2';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-agendar-examen',
  templateUrl: './agendar-examen.component.html',
  styleUrls: ['./agendar-examen.component.sass']
})
export class AgendarExamenComponent implements OnInit {

  cita = new CitaExamenModel();

  pacientes: PacienteModel[] = [];
  paciente = new PacienteModel();

  examenes: ExamenModel[] = [];
  examen = new ExamenModel();

  cargando = false;

  public href: string = " ";

  constructor(
    private citasExamenServices: CitasExamenServices,
    private route: ActivatedRoute,
    private router: Router,
    private pacientesServices: PacientesServices,
    private examenesServices: ExamenesServices
  ) { }

  ngOnInit(): void {
    this.cargando = true;

    const id = this.route.snapshot.paramMap.get('id');

    this.magicScript();

    if (id !== 'nuevo') {
      this.citasExamenServices.getCita(id)
        .subscribe((resp: CitaExamenModel) => {
          this.cita = resp;
          this.cita.id = id;
        });
    }

    this.pacientesServices.getPacientes()
      .subscribe(resp => {
        this.pacientes = resp;
        this.cargando = false;
      });

    this.examenesServices.getExamenes()
      .subscribe(resp => {
        this.examenes = resp;
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
      peticion = this.citasExamenServices.actualizarCita(this.cita)
    } else {
      peticion = this.citasExamenServices.crearCita(this.cita)
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: 'Se actualizo la informacion correctamente',
        text: 'Regresando a la agenda de examenes',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Cerrar'
      });

      window.location.href = '#/citas-examen';

    });

  }

  magicScript() {

    let btnSecond = $("#btnNuevoExamen");
    let btn = $(".botonEscondido");
    let inputs = $(".formulario form .form-control");
    let btnGuardar = $("#botonGuardarCambios");
    let btnStatus = $("#statusPay");

    btn.hide();

    this.href = this.router.url;

    console.log(btnStatus.length);


    if (this.href !== '/cita-examen/nuevo' ){

      btn.show().addClass("active");
      inputs.attr("disabled", "disabled");
      btnStatus.addClass('disabled')
      btnSecond.hide();
      btnGuardar.hide();


    }

    btn.click(function () {

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
          btnStatus.removeClass('disabled')
        }
      });

    });


  }

}
