import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDevice'
})
export class DateDevicePipe implements PipeTransform {

  transform(value: any, format: string = 'short'): any {
    if (!value) null;
    const deviceDate = new Date(value)
    return this.formatDate(deviceDate,format)
  }
  private formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }
    return new Intl.DateTimeFormat('es-ES', options).format(date)
  }

}
