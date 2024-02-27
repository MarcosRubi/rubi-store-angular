import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService, SelectItemGroup } from 'primeng/api';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { PrimeNGConfig } from 'primeng/api';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'step-select-date',
  templateUrl: './step-select-date.component.html',
  styleUrls: ['./step-select-date.component.scss'],
})
export class StepSelectDateComponent implements OnInit {
  private router = inject(Router);
  private validatorService = inject(ValidatorsService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  public loadingHour = false;
  public dateNow = new Date();
  public maxDate = new Date(this.dateNow);
  public groupHoursAvailable!: any;
  public loading: boolean = false;

  public formDate: FormGroup = this.fb.group({
    date: ['', [Validators.required]],
    hour: ['', [Validators.required]],
    userHourSelected: ['', [Validators.required]],
  });

  public esLocaleSettingsCalendar = {
    startsWith: 'Comience con',
    contains: 'Contenga',
    notContains: 'No contenga',
    endsWith: 'Termine con',
    equals: 'Igual a',
    notEquals: 'Diferente a',
    noFilter: 'Sin filtro',
    lt: 'Menor que',
    lte: 'Menor o igual a',
    gt: 'Mayor que',
    gte: 'Mayor o igual a',
    dateIs: 'Fecha igual a',
    dateIsNot: 'Fecha diferente a',
    dateBefore: 'Fecha antes de',
    dateAfter: 'Fecha después de',
    custom: 'Personalizar',
    clear: 'Limpiar',
    apply: 'Aplicar',
    matchAll: 'Coincidir todo',
    matchAny: 'Coincidir con cualquiera',
    addRule: 'Agregar regla',
    removeRule: 'Eliminar regla',
    accept: 'Sí',
    reject: 'No',
    choose: 'Escoger',
    upload: 'Subir',
    cancel: 'Cancelar',
    fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    today: 'Hoy',
    now: 'Ahora',
    weekHeader: 'Sem',
    firstDayOfWeek: 1,
    showMonthAfterYear: false,
    dateFormat: 'dd/mm/yy',
    weak: 'Débil',
    medium: 'Medio',
    strong: 'Fuerte',
    passwordPrompt: 'Escriba una contraseña',
    emptyFilterMessage: 'Sin opciones disponibles',
    emptySearchMessage: 'Sin opciones disponibles',
    emptyMessage: 'No se han encontrado resultados',
    aria: {
      trueLabel: 'Verdadero',
      falseLabel: 'Falso',
      nullLabel: 'No seleccionado',
      star: '1 estrella',
      stars: '{star} estrellas',
      selectAll: 'Seleccionar todos',
      unselectAll: 'Deseleccionar todos',
      close: 'Cerrar',
      previous: 'Anterior',
      next: 'Siguiente',
      navigation: 'Navegación',
      scrollTop: 'Desplazarse hacia arriba',
      moveTop: 'Mover arriba',
      moveUp: 'Subir',
      moveDown: 'Bajar',
      moveBottom: 'Desplazarse hacia abajo',
      moveToTarget: 'Mover al objetivo',
      moveToSource: 'Mover al origen',
      moveAllToTarget: 'Mover todo al objetivo',
      moveAllToSource: 'Mover todo al origen',
      pageLabel: 'Página {page}',
      firstPageLabel: 'Primera Página',
      lastPageLabel: 'Última Página',
      nextPageLabel: 'Siguiente Página',
      previousPageLabel: 'Página Anterior',
      rowsPerPageLabel: 'Filas por página',
      jumpToPageDropdownLabel: 'Ir al menú desplegable de página',
      jumpToPageInputLabel: 'Ir a la entrada de página',
      selectRow: 'Seleccionar fila',
      unselectRow: 'Desmarcar fila',
      expandRow: 'Expandir Fila',
      collapseRow: 'Reducir Fila',
      showFilterMenu: 'Mostrar menú del filtro',
      hideFilterMenu: 'Ocultar menú del filtro',
      filterOperator: 'Operador de filtro',
      filterConstraint: 'Restricción de filtro',
      editRow: 'Editar fila',
      saveEdit: 'Guardar editado',
      cancelEdit: 'Cancelar editado',
      listView: 'Vista de lista',
      gridView: 'Vista de cuadrícula',
      slide: 'Deslizar',
      slideNumber: '{slideNumber}',
      zoomImage: 'Ampliar imagen',
      zoomIn: 'Ampliar',
      zoomOut: 'Reducir',
      rotateRight: 'Girar a la derecha',
      rotateLeft: 'Girar a la izquierda',
    },
  };

  constructor(
    private config: PrimeNGConfig,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.isValidPrevSteps();

    // OBSERVER DE CAMBIO DE FECHA
    this.formDate.get('date')?.valueChanges.subscribe(() => {
      this.formDate.get('hour')?.setValue('');
      this.groupHoursAvailable = [];

      if (this.formDate.get('userHourSelected')?.value) {
        this.getTimesAvailable();
      }

      this.scheduleService.saveDateSelect(this.formDate.get('date')?.value);
    });

    // INSERTANDO LOS VALORES DE LOCALSTORAGE
    this.formDate.get('date')?.setValue(this.scheduleService.dateSelected);
    this.formDate
      .get('userHourSelected')
      ?.setValue(this.scheduleService.hourSelectedInput);

    if (this.scheduleService.hourSelected) {
      this.formDate.get('hour')?.setValue(this.scheduleService.hourSelected);
    }

    this.maxDate.setMonth(this.dateNow.getMonth() + 9);
    this.config.setTranslation(this.esLocaleSettingsCalendar);

    const hourSelecterForUser = this.getTimeSelectedForUser();
    if (hourSelecterForUser && !this.scheduleService.hourSelected) {
      this.getTimesAvailable();
    } else {
      this.updateHoursAvailable(hourSelecterForUser);
    }
  }

  onSave() {
    this.formDate.markAllAsTouched();

    const isValid = this.isValidDataForm();

    if (isValid) {
      // COMPLETE ✅: SI TIENE LA FECHA Y HORA, PERO NO HA SELECCIONADO EL HORARIO DISPONIBLE LLAMAR LA FUNCIÓN this.getTimesAvailable();
      if (!this.formDate.get('hour')?.value) {
        this.getTimesAvailable();

        this.messageService.add({
          severity: 'warn',
          summary: '',
          detail: 'Seleccione el horario!',
        });
        return;
      }
      this.loading = true;

      this.messageService.add({
        severity: 'success',
        summary: 'Completado',
        detail: 'Solo un paso más!',
      });
      setTimeout(() => {
        this.loading = false;

        this.router.navigate(['cliente']);
      }, 2000);
    }
  }

  getTimesAvailable() {
    this.loadingHour = true;

    const isValid = this.isValidDataForm();

    if (isValid) {
      const hourSelecterForUser = this.getTimeSelectedForUser();

      if (hourSelecterForUser) {
        setTimeout(() => {
          this.loadingHour = false;
          this.updateHoursAvailable(hourSelecterForUser);
        }, 2000);
        return;
      }

      setTimeout(() => {
        this.loadingHour = false;
        this.updateHoursAvailable();

        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'Hora seleccionada no disponible!',
        });
      }, 2000);
      return;
    }

    this.loadingHour = false;
  }

  updateHoursAvailable(hourSelectedForUser: any = null) {
    // TODO: OBTENER LOS HORARIOS DISPONIBLES EN LA BASE DE DATOS
    this.groupHoursAvailable = [
      {
        label: 'Horarios disponibles',
        items: [
          { start: '09:00', end: '09:45' },
          { start: '09:45', end: '10:45' },
          { start: '10:45', end: '11:45' },
          { start: '13:00', end: '13:45' },
          { start: '15:00', end: '15:45' },
        ],
      },
    ];

    if (hourSelectedForUser) {
      this.groupHoursAvailable.unshift(hourSelectedForUser);
      this.scheduleService.saveHour(hourSelectedForUser.items[0]);
      this.formDate.get('hour')?.setValue(hourSelectedForUser.items[0]);

      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Hora solicitada disponible!',
      });
    }
  }

  getError(field: string) {
    return this.validatorService.getErrorMessage(this.formDate, field);
  }

  convertHourToElSalvador(dateISO: string): string {
    const date = new Date(dateISO);

    const utcHours = date.getUTCHours();
    date.setUTCHours(utcHours);

    const elSalvadorHours = utcHours - 6;
    date.setHours(elSalvadorHours);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  getHourEndService(hour: string, timeServices: number): string {
    const [hours, minutes, seconds] = hour.split(':').map(Number);
    const hourConvert = new Date();
    hourConvert.setHours(hours);
    hourConvert.setMinutes(minutes + timeServices);

    const hourToEnd = String(hourConvert.getHours()).padStart(2, '0');
    const minutesToEnd = String(hourConvert.getMinutes()).padStart(2, '0');

    return `${hourToEnd}:${minutesToEnd}`;
  }

  isValidDataForm() {
    const dateControl = this.formDate.get('date');
    const hourUSerControl = this.formDate.get('userHourSelected');

    if (!dateControl?.value) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una fecha.',
      });
      return false;
    }

    if (!hourUSerControl?.value) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ingrese una hora.',
      });
      return false;
    }

    return true;
  }

  getTimeSelectedForUser() {
    const hourStartService = this.convertHourToElSalvador(
      this.formDate.get('userHourSelected')?.value
    );

    const hourEndService = this.getHourEndService(
      hourStartService,
      this.scheduleService.totalTime
    );

    // TODO: ENVIAR EL RANGO DE TIEMPO A VERIFICAR, SI HAY QUE LO RETORNE, SINO NO RETORNA NADA
    return {
      label: 'Hora solicitada',
      items: [{ start: hourStartService, end: hourEndService }],
    };
  }

  isValidPrevSteps() {
    if (!this.scheduleService.totalTime) {
      this.goBack();
      return;
    }
  }
  goBack() {
    this.router.navigate(['servicios']);
  }

  handleChangeHourSelected(value: any) {
    this.scheduleService.saveHour(value);
  }

  handleChangeHourForUser() {
    this.scheduleService.saveHourInput(
      this.formDate.get('userHourSelected')?.value
    );
    this.getTimesAvailable();
  }
}
