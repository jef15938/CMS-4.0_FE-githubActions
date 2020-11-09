import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText'
})
export class SplitTextPipe implements PipeTransform {

  constructor() { }

  transform(value: string, charactersPerLine: number): string {
    value = value || '';
    if (value.length <= charactersPerLine) { return value; }

    const sections: string[] = [];
    while (value.length > charactersPerLine) {
      const section = value.substr(0, charactersPerLine);
      sections.push(section);
      value = value.replace(section, '');
    }
    return sections.join('\n');
  }

}
