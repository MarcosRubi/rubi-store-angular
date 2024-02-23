import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StepSelecServicesComponent } from './pages/step-selec-services/step-selec-services.component';
import { StepSelectDateComponent } from './pages/step-select-date/step-select-date.component';
import { StepInfoClientComponent } from './pages/step-info-client/step-info-client.component';
import { StepConfirmScheduleComponent } from './pages/step-confirm-schedule/step-confirm-schedule.component';

const ROUTES: Routes = [
  { path: 'servicios', component: StepSelecServicesComponent },
  { path: 'fecha', component: StepSelectDateComponent },
  { path: 'cliente', component: StepInfoClientComponent },
  { path: 'confirmacion', component: StepConfirmScheduleComponent },
  {
    path: '**',
    redirectTo: 'servicios',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
