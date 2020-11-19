import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText'
})
export class SplitTextPipe implements PipeTransform {

  constructor() { }

  transform(text: string, charactersPerLine: number): string {
    text = text || '';
    return this.getSplittedText(text, charactersPerLine);
  }

  private getSplittedText(text: string, charactersPerLine: number) {
    if (text.length <= charactersPerLine) {
      return text;
    }
    const section = text.substr(0, charactersPerLine);
    return [section, this.getSplittedText(text.replace(section, ''), charactersPerLine)].join('\n');
  }

}
