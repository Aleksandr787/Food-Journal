import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    switch (value) {
      case 1:
      case '1':
      return 'Мужской';
      case '2':
      case 2: return 'Женский';
    }

    return 'Не указан';
  }

}
