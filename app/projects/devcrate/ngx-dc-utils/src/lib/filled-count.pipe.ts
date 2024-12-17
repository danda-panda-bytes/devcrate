import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filledCount',
  standalone: true
})
export class NgxDcFilledCountPipe implements PipeTransform {

  transform(items: any[], ...args: unknown[]): unknown {
    return items.filter(v => !!v).length;
  }
}
