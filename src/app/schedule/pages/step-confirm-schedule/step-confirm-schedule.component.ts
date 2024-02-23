import { Component, OnInit, inject } from '@angular/core';
import { ScheduleService } from '../../service/schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'step-confirm-schedule',
  templateUrl: './step-confirm-schedule.component.html',
  styleUrls: ['./step-confirm-schedule.component.scss'],
})
export class StepConfirmScheduleComponent implements OnInit {
  private router = inject(Router);

  public services: any;
  public date: any;
  public hour: any;
  public client: any;

  constructor(private scheduleService: ScheduleService) {}
  ngOnInit(): void {
    this.isValidPrevSteps();

    this.services = this.scheduleService.servicesSelected;
    this.date = this.scheduleService.dateSelected;
    this.hour = this.scheduleService.hourSelected;
    this.client = this.scheduleService.dataClient;
  }

  formatHour(hour: string): string {
    if (hour) {
      const [hours, minutes] = hour.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convertir 0 a 12 en formato de 12 horas
      const formattedMinutes = minutes.toString().padStart(2, '0'); // Asegurar que los minutos tengan dos dígitos
      return `${formattedHours}:${formattedMinutes} ${period}`;
    }
    return '';
  }

  isValidPrevSteps() {
    if (!this.scheduleService.totalTime) {
      this.router.navigate(['servicios']);
      return;
    }
    if (!this.scheduleService.hourSelected) {
      this.router.navigate(['fecha']);
      return;
    }

    if (!this.scheduleService.dataClient) {
      this.router.navigate(['cliente']);
      return;
    }
  }
  goBack() {
    this.router.navigate(['cliente']);
  }
}
