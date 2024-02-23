import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'schedule-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Selección de servicios',
        routerLink: '/servicios',
      },
      {
        label: 'Selección de fecha y hora',
        routerLink: '/fecha',
      },
      {
        label: 'Información del cliente',
        routerLink: '/cliente',
      },
      {
        label: 'Confirmación',
        routerLink: '/confirmacion',
      },
    ];
  }
}
