import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activity',
  standalone: true
})
export class ActivityPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    switch (value) {
      case 1:
      case '1':
      return 'Сидячий образ жизни';
      case '2':
      case 2: return 'Небольшая активность';
      case '3':
      case 3: return 'Умеренная активность';
      case '4':
      case 4: return 'Высокая активность';
    }

    return 'Не указана';
  }

}
