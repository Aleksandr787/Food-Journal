import { Pipe, PipeTransform } from '@angular/core';
import { IBookImage } from '../../interfaces/book';

@Pipe({
  name: 'author',
  standalone: true
})
export class AuthorPipe implements PipeTransform {

  transform(book: IBookImage, ...args: unknown[]): string {
    if (book.author.includes('.') || !book.author.includes(' ')) return book.author;
    let test = book.author.split(' ');
    return `${test[1]} ${test[0][0]}.`;
  }
}
