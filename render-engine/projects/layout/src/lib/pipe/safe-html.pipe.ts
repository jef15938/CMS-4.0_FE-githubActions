import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }

  transform(value: string, args?: any): SafeHtml {
    if (value) {
      return this.sanitized.bypassSecurityTrustHtml(value);
    } else {
      return 'Undefined HTML';
    }
  }

}
