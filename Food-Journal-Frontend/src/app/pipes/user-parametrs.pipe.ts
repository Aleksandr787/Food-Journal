import { Pipe, PipeTransform } from '@angular/core';
import { IUserParametrs } from '../interfaces/user';
import { GoalPipePipe } from './goal-pipe.pipe';

@Pipe({
  name: 'userParametrs',
  standalone: true
})
export class UserParametrsPipe implements PipeTransform {

  private validation(value: number, text: string): number | string {
    if (value === -1) return text;
    return value;
  }

  transform(userParametrs: IUserParametrs | undefined, ...args: unknown[]): string {
    if (!userParametrs) return `<h2>Информация не указана</h2>`;
    // let age: number | string = userParametrs.age;
    // if(age === -1) age = "не указан";    
    let goal = 'не указана'
    switch (userParametrs.goal) {
      case 1:
        goal = "Понижение веса";
        break;
      case 2:
        goal = 'Поддержание веса';
        break;
      case 3:
        goal = 'Набор веса';
        break;
    }

    let gender = 'не указан'
    switch (userParametrs.gender) {
      case 1:
        gender = "Мужской";
        break;
      case 2:
        gender = "Женский";
        break;
    }


    let activity = "не указана";
    switch (userParametrs.activity) {
      case 1:
        activity = "Сидячий образ жизни";
        break;
      case 2:
        activity = 'Небольшая активность';
        break;
      case 3:
        activity = 'Умеренная активность';
        break;
      case 4:
        activity = 'Высокая активность';
        break;
    }

    return `
    <h2>Возраст: ${this.validation(userParametrs.age, "не указан")}</h2>
    <h2>Рост(см): ${this.validation(userParametrs.height, "не указан")}</h2>
    <h2>Вес(кг): ${this.validation(userParametrs.weight, "не указан")}</h2>
    <h2>Пол: ${gender}</h2>
    <h2>Физическая активность: ${activity}</h2>
    <h2>Цель: ${goal}</h2>
  `;
  }
}
