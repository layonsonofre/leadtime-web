import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'toDate' })
export class StringToDatePipe implements PipeTransform {
   transform(value: any, args: string[]): Date {
      if (!value) return null;
      return new Date(value.trim());
   }
}
