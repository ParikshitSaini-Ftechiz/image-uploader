import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return value;
    }
    return value.filter(item =>
      item.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_salary.toString().includes(searchTerm) ||
      item.employee_age.toString().includes(searchTerm)
    );
  }
}