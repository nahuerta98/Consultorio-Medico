import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CitaMedicaComponent } from './pages/cita-medica/cita-medica.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { MedicamentosComponent } from './pages/medicamentos/medicamentos.component';
import { VerCitasComponent } from './pages/ver-citas/ver-citas.component';
import { CitasParaHoyComponent } from './pages/citas-para-hoy/citas-para-hoy.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { CitaMedicaPexistenteComponent } from './pages/cita-medica-pexistente/cita-medica-pexistente.component';
import { RecetamedicaComponent } from './pages/recetamedica/recetamedica.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { AgendarExamenComponent } from './pages/agendar-examen/agendar-examen.component';
import { AgendaExamenesComponent } from './pages/agenda-examenes/agenda-examenes.component';

const routes: Routes = [
  { 
    path: 'home', component: HomeComponent
  },
  {
    path: 'cita/:id', component: CitaMedicaComponent
  },
  {
    path: 'cita-paciente-existente/:id', component: CitaMedicaPexistenteComponent
  },  
  {
    path: 'todas-las-citas', component: VerCitasComponent
  },
  {
    path: 'citas-para-hoy', component: CitasParaHoyComponent
  },
  {
    path: 'examenes', component: ExamenesComponent
  },
  {
    path: 'examen/:id', component: ExamenComponent
  },
  {
    path: 'citas-examen', component: AgendaExamenesComponent
  },
  {
    path: 'cita-examen/:id', component: AgendarExamenComponent
  },
  {
    path: 'medicamentos', component: MedicamentosComponent
  },
  {
    path: 'pacientes', component: PacientesComponent
  },
  {
    path: 'paciente/:id', component: PacienteComponent
  },  
  {
    path: 'receta-medica', component: RecetamedicaComponent
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true } )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
