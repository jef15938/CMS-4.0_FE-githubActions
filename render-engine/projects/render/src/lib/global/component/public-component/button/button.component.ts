import { Component, Input, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

export type buttonAppearance = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'textButton' | 'other';

@Component({
  selector: 'rdr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends CustomizeBaseDirective implements OnInit {

  @Input() disabled = false;
  @Input() styleType: buttonAppearance = 'primary';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }
}
