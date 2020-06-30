import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeResource'
})
export class SafeResourcePipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }

  transform(value: string, args?: any): SafeResourceUrl {
    if (value) {
      return this.sanitized.bypassSecurityTrustResourceUrl(value);
    } else {
      return '';
    }
  }

}
