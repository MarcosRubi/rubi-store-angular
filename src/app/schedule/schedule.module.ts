import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { ScheduleRoutingModule } from './schedule-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { StepSelecServicesComponent } from './pages/step-selec-services/step-selec-services.component';
import { StepSelectDateComponent } from './pages/step-select-date/step-select-date.component';
import { StepInfoClientComponent } from './pages/step-info-client/step-info-client.component';
import { StepConfirmScheduleComponent } from './pages/step-confirm-schedule/step-confirm-schedule.component';
import { ButtonsFooterComponent } from './components/buttons-footer/buttons-footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    StepSelecServicesComponent,
    StepSelectDateComponent,
    StepInfoClientComponent,
    StepConfirmScheduleComponent,
    ButtonsFooterComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
})
export class ScheduleModule {}
