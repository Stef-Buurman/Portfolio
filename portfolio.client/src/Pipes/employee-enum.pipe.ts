import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeCount } from '../Enums/EmployeeCount';

@Pipe({
  name: 'employeeEnum'
})
export class EmployeeEnumPipe implements PipeTransform {
  transform(value: EmployeeCount): string {
    switch (value) {
      case EmployeeCount.OneToTen: return '1-10';
      case EmployeeCount.ElevenToFifty: return '11-50';
      case EmployeeCount.FiftyOneToTwoHundred: return '51-200';
      case EmployeeCount.TwoHundredToFiveHundred: return '201-500';
      case EmployeeCount.FiveHundredToOneThousand: return '501-1000';
      case EmployeeCount.OneThousandPlus: return '1000+';
      default: return 'Unknown';
    }
  }
}
