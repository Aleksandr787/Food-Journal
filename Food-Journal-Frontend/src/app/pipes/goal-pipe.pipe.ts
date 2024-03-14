import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goalPipe',
  standalone: true
})
export class GoalPipePipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    switch (value) {
      case 1:
      case '1':
      return 'Понижение веса';
      case '2':
      case 2: return 'Поддержание веса';
      case '3':
      case 3: return 'Набор веса';
    }

    return 'нет цели';
  }
}
