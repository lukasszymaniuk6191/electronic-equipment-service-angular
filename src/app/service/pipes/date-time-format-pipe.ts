import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateTimeFormatPipe'
})
export class DateTimeFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: Date, args?: any): any {

    const currentDate = Date.now();
    const date = new Date(value);
    const time = Math.ceil((currentDate - date.getTime()) / (1000));

    if (time < 60) {
      return 'NOW';
    }
    if (time >= 60 && time < 3600) {
      return Math.ceil(time / 60) + ' MIN AGO';
    }
    if (time >= 3600 && time < 86400) {
      return Math.ceil(time / (60 * 60)) + ' HOUR AGO';
    }
    if (time >= 86400) {
      return this.datePipe.transform(value, 'd/M/y');
    }

  }
}
