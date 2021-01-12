import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNullWithText'
})
export class ReplaceNullWithTextPipe implements PipeTransform {

  transform(value: any, repleceText: string = 'N/A'): String {
    if (typeof value === 'undefined' || value === null) {
      return repleceText;
    }

    return value;
  }

}
