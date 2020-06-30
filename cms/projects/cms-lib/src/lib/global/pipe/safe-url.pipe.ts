import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }

  transform(value: string, args?: any): SafeResourceUrl {
    if (value) {
      return this.sanitized.bypassSecurityTrustUrl(value);
    } else {
      return '';
    }
  }

}
