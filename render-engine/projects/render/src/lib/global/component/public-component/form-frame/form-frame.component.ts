import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation, Injector } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-form-frame',
  templateUrl: './form-frame.component.html',
  styleUrls: ['./form-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFrameComponent extends CustomizeBaseDirective implements AfterViewInit {

  @ViewChild('error') errorContent: ElementRef;

  @Input() inline = false;
  @Input() title = '標題';
  @Input() suffix: string;
  @Input() note: string;
  @Input() required = false;

  errorHide = true;

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit() {
    if (!this.errorContent.nativeElement.hasChildNodes()) {
      this.errorContent.nativeElement.style.display = 'none';
    }
  }
}
