import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { PacientesServices } from '../../services/pacientes.service';
import { PacienteModel } from '../../models/paciente.model';

import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.sass']
})

export class PacienteComponent  implements OnInit {

  public href: string = " ";

  paciente = new PacienteModel();

  constructor(
    private pacientesServices: PacientesServices,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(  ): void {


    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.pacientesServices.getPaciente(id)
        .subscribe((resp: PacienteModel) => {
          this.paciente = resp;
          this.paciente.id = id;
        });
    }
    this.mostrarBotonParaEditar();

  }


  guardar(form: NgForm) {

    let inputs = $(".formulario form .form-control");
    let btnGuardar = $("#botonGuardarCambios");
    let btn = $(".botonEscondido");

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

    if (this.paciente.id) {
      peticion = this.pacientesServices.actualizarPaciente(this.paciente)
    } else {
      peticion = this.pacientesServices.crearPaciente(this.paciente)
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: 'Se actualizo la informacion correctamente',
        text: 'Regresando a la lista de pacientes',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: "Cerrar"
      });

      inputs.attr("disabled", "disabled");
      btnGuardar.hide();
      btn.show();

    });


    window.location.href = '#/pacientes';


  }

  mostrarBotonParaEditar() {

    let btnNuevoPaciente = $("#btnNuevoPaciente");
    let btn = $(".botonEscondido");
    let inputs = $(".formulario form .form-control");
    let btnGuardar = $("#botonGuardarCambios");
    let btnSidebar = $("#recargar");

    btn.hide();

    this.href = this.router.url;


    if ( this.href !== '/paciente/nuevo' ){
    
      btn.show().addClass("active");
      inputs.attr("disabled", "disabled");
      btnGuardar.hide();
      btnNuevoPaciente.remove();

      btnSidebar.click(function(){
        location.reload();
      });


    }

    btn.click(function(){

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
          $( this ).hide();
          inputs.removeAttr("disabled");
          btnGuardar.show().text("Guardar").prepend('<i class="fas fa-save"></i>');
        }
      });

    });



  }

  changeButton(){
  
    let losBtns = $(".seleccionar-vista a");
    let losBloques = $(".bloque");

    losBtns.click(function(){

      let index = losBtns.index( $(this) );

      losBtns.removeClass("active");
      losBtns.eq(index).addClass("active");

      losBloques.removeClass("active");
      losBloques.eq(index).addClass("active");

    });

  }
}
