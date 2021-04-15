import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  public href: string = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.openDropBox();
  }


  openDropBox() {
    let
      otherLinks = $('.box-menu .link-icon'),
      actionDrop = $('.box-menu .dropAct'),
      boxDrop = $('.box-menu .dropMenu');

    otherLinks.click(function () {
      boxDrop.removeClass("open");
      actionDrop.removeClass("active");
    });

    actionDrop.click(function () {
      let index = actionDrop.index($(this));
      boxDrop.removeClass("open");
      boxDrop.eq(index).toggleClass("open");
      $(this).toggleClass("active");
    });

  }

  recargarExamenes() {
    window.location.href = '#/examen/nuevo';
    location.reload();
  }

  recargarPacientes() {
    window.location.href = '#/paciente/nuevo';
    location.reload();
  }  

}
