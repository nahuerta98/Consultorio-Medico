import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ExamenesServices } from '../../services/examenes.service';
import { ExamenModel } from '../../models/examen.model';

import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.sass']
})
export class ExamenComponent implements OnInit {

  examen = new ExamenModel();
  public href: string = "";

  constructor(
    private examenesServices: ExamenesServices,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.examenesServices.getExamen(id)
        .subscribe((resp: ExamenModel) => {
          this.examen = resp;
          this.examen.id = id;
        });
    }

    this.mostrarBotonParaEditar()

  }

  guardarExamen(form: NgForm) {

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

    if (this.examen.id) {
      peticion = this.examenesServices.actualizarExamen(this.examen)
    } else {
      peticion = this.examenesServices.crearExamen(this.examen)
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: 'Se actualizo la informacion correctamente',
        text: 'Regresando a la lista de examenes',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Cerrar'
      });
      window.location.href = '#/examenes';
    });
  }

  mostrarBotonParaEditar() {

    let btnNuevoExamen = $("#btnNuevoExamen");
    let btn = $(".botonEscondido");
    let inputs = $(".formulario form .form-control");
    let btnGuardar = $("#botonGuardarCambios");
    // let btnSidebar = $("#recargarTwo");

    btn.hide();

    this.href = this.router.url;


    if (this.href !== '/examen/nuevo') {

      btn.show().addClass("active");
      inputs.attr("disabled", "disabled");
      btnGuardar.hide();
      btnNuevoExamen.remove();

    }

    // btnSidebar.click(function () {
      
    // });

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
        }
      });

    });



  }  

}
