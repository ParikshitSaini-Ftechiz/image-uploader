import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any[], direction: string, field: string): any[] {
    if (!Array.isArray(value)) {
      throw new Error('The value to sort is not an array');
    }
    if (!direction) {
      return value;
    }

    const sortedArray = value.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });

    return direction === 'asc' ? sortedArray : sortedArray.reverse();
  }
}
