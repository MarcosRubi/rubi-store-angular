import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  exports: [
    ToastModule,
    StepsModule,
    CardModule,
    ButtonModule,
    DividerModule,
    InputMaskModule,
    AutoCompleteModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    ListboxModule,
    TableModule,
    CheckboxModule,
  ],
})
export class PrimeNgModule {}
