import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  private emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  private extractNumbers(phoneValue: string) {
    return phoneValue.replace(/\D/g, '');
  }

  public required = (control: FormControl): ValidationErrors | null => {
    if (control && control.value === null) return { required: true };
    if (control && control.value.trim().length === 0) return { required: true };

    return null;
  };
  public isValidHour = (control: FormControl): ValidationErrors | null => {
    const start = control.value?.start;
    const end = control.value?.end;

    if (start === undefined && end === undefined) {
      return {
        required: true,
      };
    }

    return null;
  };

  public isValidEmail = (control: FormControl): ValidationErrors | null => {
    if (!new RegExp(this.emailPattern).test(control.value))
      return { formatEmail: true };

    return null;
  };

  public isValidPhone = (control: FormControl): ValidationErrors | null => {
    const phoneNumberSetter = this.extractNumbers(control.value);

    if (phoneNumberSetter.length !== 8) return { lengthPhone: true };

    return null;
  };

  public getErrorMessage(form: FormGroup, field: string) {
    const control = form.controls[field];

    if (control.errors && control.touched) {
      const [firstErrorKey] = Object.keys(control.errors || []);
      switch (firstErrorKey) {
        case 'required':
          return 'Este campo es requerido.';
        case 'formatEmail':
          return 'Formato de email no válido.';
        case 'lengthPhone':
          return 'Número de teléfono no válido.';
        default:
          return null;
      }
    }

    return null;
  }
}
