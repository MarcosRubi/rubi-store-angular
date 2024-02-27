import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ScheduleService } from '../../service/schedule.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'step-selec-services',
  templateUrl: './step-selec-services.component.html',
  styleUrls: ['./step-selec-services.component.scss'],
})
export class StepSelecServicesComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  private MessageService = inject(MessageService);
  private Router = inject(Router);

  public listAllServices: any[] = [];
  public totalPrice = 0;
  public totalTime = 0;
  public loading: boolean = false;
  servicesSelected: any[] = [];

  public formInfoServices: FormGroup = this.fb.group({
    servicesSelected: ['', Validators.required],
  });

  ngOnInit(): void {
    this.listAllServices = this.getServicesToDB();

    this.formInfoServices
      .get('servicesSelected')
      ?.setValue(this.scheduleService.servicesSelected);

    this.servicesSelected = this.scheduleService.servicesSelected;

    this.calculateTotals();
  }

  constructor(private scheduleService: ScheduleService) {}

  onSave() {
    this.formInfoServices.markAllAsTouched();
    this.loading = true;

    if (
      this.formInfoServices.valid &&
      this.formInfoServices.get('servicesSelected')?.value.length > 0
    ) {
      this.MessageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Excelente!',
      });

      setTimeout(() => {
        this.loading = false;

        this.Router.navigate(['fecha']);
      }, 2000);
    } else {
      this.loading = false;

      this.MessageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione al menos un servicio!',
      });
    }
  }

  onSelectedValuesChange(newValues: any): void {
    this.formInfoServices.get('servicesSelected')?.setValue(newValues);

    this.scheduleService.saveServicesSelect(newValues);
    this.scheduleService.removeHourFromLocalStorage();
    this.calculateTotals();
  }

  getServicesToDB() {
    // TODO: OBTENER LOS SERVICIOS DE LA BASE DE DATOS
    return [
      {
        id: 1,
        nameService: 'Manicura básica',
        price: 10.0,
        time: 30,
      },
      {
        id: 2,
        nameService: 'Uñas de gel',
        price: 10.0,
        time: 40,
      },
      {
        id: 3,
        nameService: 'Pedicura spa',
        price: 10.0,
        time: 20,
      },
      {
        id: 4,
        nameService: 'Diseño de uñas artísticas',
        price: 10.0,
        time: 50,
      },
      {
        id: 5,
        nameService: 'Relleno de uñas acrílicas',
        price: 10.0,
        time: 60,
      },
    ];
  }

  calculateTotals() {
    this.totalPrice = 0;
    this.totalTime = 0;
    this.formInfoServices
      .get('servicesSelected')
      ?.value.forEach((service: any, index: number) => {
        this.totalPrice += service.price;
        this.totalTime += service.time;
      });

    this.scheduleService.saveTotalTime(this.totalTime);
  }

  public calculateTimeInHoursAndMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      if (minutes > 0) {
        return `${hours} hora${hours > 1 ? 's' : ''} y ${minutes} minuto${
          minutes > 1 ? 's' : ''
        }`;
      } else {
        return `${hours} hora${hours > 1 ? 's' : ''}`;
      }
    } else {
      return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
  }
}
