import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { MessageService } from 'primeng/api';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'step-info-client',
  templateUrl: './step-info-client.component.html',
  styleUrls: ['./step-info-client.component.scss'],
})
export class StepInfoClientComponent implements OnInit {
  private router = inject(Router);
  private validatorService = inject(ValidatorsService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  public loading: boolean = false;
  public formInfoClient: FormGroup = this.fb.group({
    client: ['', [this.validatorService.required]],
    email: [
      '',
      [this.validatorService.required, this.validatorService.isValidEmail],
    ],
    phone: [
      '',
      [this.validatorService.required, this.validatorService.isValidPhone],
    ],
    notes: [''],
  });

  constructor(private scheduleService: ScheduleService) {}
  ngOnInit(): void {
    this.isValidPrevSteps();
    if (this.scheduleService.dataClient) {
      this.formInfoClient.setValue(this.scheduleService.dataClient);
    }
  }

  getError(field: string) {
    return this.validatorService.getErrorMessage(this.formInfoClient, field);
  }

  onSave() {
    this.formInfoClient.markAllAsTouched();

    if (this.formInfoClient.valid) {
      this.scheduleService.saveClient(this.formInfoClient.value);
      this.loading = true;

      this.messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Ya casi lo tienes!',
      });

      setTimeout(() => {
        this.loading = false;

        this.router.navigate(['confirmacion']);
      }, 2000);
    }
  }
  isValidPrevSteps() {
    if (!this.scheduleService.totalTime) {
      this.router.navigate(['servicios']);
      return;
    }
    if (!this.scheduleService.hourSelected) {
      this.goBack();
      return;
    }
  }
  goBack() {
    this.router.navigate(['fecha']);
  }
}
