import { Component, ElementRef, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NxHamburgerComponent } from '@neux/ui';
import { CustomizeBaseCtor, mixinCustomizeBase } from '../base-component';

const hamburgerMixinBase:
  CustomizeBaseCtor &
  typeof NxHamburgerComponent
  = mixinCustomizeBase(NxHamburgerComponent);

@Component({
  selector: 'rdr-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['active']
})
export class HamburgerComponent extends hamburgerMixinBase implements OnInit {

  @HostBinding('class') class;
  @Input() active = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit(): void {
  }
}
