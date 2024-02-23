import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private _servicesSelected: any = [];
  private _totalTime: any;
  private _date: any;
  private _hourSelectedInput: any;
  private _hour: any;
  private _client: any;

  constructor() {
    const storedServices = this.getFromLocalStorage('services');
    if (storedServices) {
      this._servicesSelected = storedServices;
    }

    const storedDate = this.getFromLocalStorage('date');
    if (storedDate) {
      this._date = new Date(storedDate);
    }

    const storedTotalTime = this.getFromLocalStorage('time');
    if (storedTotalTime) {
      this._totalTime = storedTotalTime;
    }

    const storedHourInput = this.getFromLocalStorage('hourInput');
    if (storedHourInput) {
      this._hourSelectedInput = new Date(storedHourInput);
    }

    const storedClient = this.getFromLocalStorage('client');
    if (storedClient) {
      this._client = storedClient;
    }
    const storedHour = this.getFromLocalStorage('hour');
    if (storedHour) {
      this._hour = storedHour;
    }
  }

  get servicesSelected() {
    return [...this._servicesSelected];
  }
  get dateSelected() {
    return this._date;
  }
  get totalTime() {
    return this._totalTime;
  }
  get hourSelectedInput() {
    return this._hourSelectedInput;
  }
  get dataClient() {
    return this._client;
  }
  get hourSelected() {
    return this._hour;
  }

  saveServicesSelect(services: []) {
    this._servicesSelected = services;
    this.saveToLocalStorage('services', services);
  }
  saveDateSelect(date: any) {
    if (date) {
      this._date = date;
      this.saveToLocalStorage('date', date);
    }
  }
  saveTotalTime(time: any) {
    if (time > 0) {
      this._totalTime = time;
      this.saveToLocalStorage('time', time);
      return;
    }
    this._totalTime = 0;
    this.saveToLocalStorage('time', 0);
  }
  saveHourInput(hour: any) {
    if (hour) {
      this._hourSelectedInput = hour;
      this.saveToLocalStorage('hourInput', hour);
    }
  }
  saveClient(client: any) {
    this._client = client;
    this.saveToLocalStorage('client', client);
  }
  saveHour(hour: any) {
    if (hour) {
      if (hour.length > 0) {
        this._hour = hour[0];
        this.saveToLocalStorage('hour', hour[0]);
        return;
      }
      this._hour = hour;
      this.saveToLocalStorage('hour', hour);
    }
  }

  // GUARDAR Y OBTENER DEL LOCALSTORAGE
  private saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  private getFromLocalStorage(key: string): any | null {
    const storedData = localStorage.getItem(key);
    if (storedData !== null && storedData !== undefined) {
      return storedData ? JSON.parse(storedData) : null;
    }
  }
  public removeHourFromLocalStorage(): void {
    localStorage.removeItem('hour');
    this._hour = null;
  }
}
