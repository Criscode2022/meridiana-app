import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ServicesPage } from './pages/services/services.page';
import { TeamPage } from './pages/team/team.page';
import { AppointmentPage } from './pages/appointment/appointment.page';
import { ConfirmationPage } from './pages/confirmation/confirmation.page';
import { ReceptionPage } from './pages/reception/reception.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'servicios', component: ServicesPage },
  { path: 'equipo', component: TeamPage },
  { path: 'cita', component: AppointmentPage },
  { path: 'cita/enviada', component: ConfirmationPage },
  { path: 'recepcion', component: ReceptionPage },
  { path: '**', redirectTo: '' },
];
