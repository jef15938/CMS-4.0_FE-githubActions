import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation, Injector, Input, HostBinding } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

export interface FastToolData {
  name: string;
  url: string;
  isBlank: boolean;
  iconUrl: string;
}

@Component({
  selector: 'rdr-fast-tool',
  templateUrl: './fast-tool.component.html',
  styleUrls: ['./fast-tool.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animateSlide', [
      state('false', style({
        transform: 'translateX(192px)',
      })),
      state('true', style({
        transform: 'translateX(0)'
      })),
      transition('false <=> true', animate('400ms cubic-bezier(.65, 0, .35, 1)'))
    ])
  ]
})
export class FastToolComponent extends CustomizeBaseDirective implements OnInit {
  @HostBinding('@animateSlide') get slideIn() { return this.showFastTool; }
  @Input() fastToolList: FastToolData[];

  showFastTool = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }


  /**
   * 開關快捷選單
   *
   * @memberof FastToolComponent
   */
  toggleFastTool() {
    this.showFastTool = !this.showFastTool;
  }

}
