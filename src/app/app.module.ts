import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import localeEsMX from '@angular/common/locales/es-MX';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CitaMedicaComponent } from './pages/cita-medica/cita-medica.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { MedicamentosComponent } from './pages/medicamentos/medicamentos.component';
import { VerCitasComponent } from './pages/ver-citas/ver-citas.component';
import { CitasParaHoyComponent } from './pages/citas-para-hoy/citas-para-hoy.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { CitaMedicaPexistenteComponent } from './pages/cita-medica-pexistente/cita-medica-pexistente.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RecetamedicaComponent } from './pages/recetamedica/recetamedica.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { AgendarExamenComponent } from './pages/agendar-examen/agendar-examen.component';
import { AgendaExamenesComponent } from './pages/agenda-examenes/agenda-examenes.component';




registerLocaleData(localeEsMX, 'es-Mx');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    CitaMedicaComponent,
    ExamenesComponent,
    MedicamentosComponent,
    VerCitasComponent,
    CitasParaHoyComponent,
    PacientesComponent,
    PacienteComponent,
    CitaMedicaPexistenteComponent,
    RecetamedicaComponent,
    ExamenComponent,
    AgendarExamenComponent,
    AgendaExamenesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    SlickCarouselModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Mx' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
