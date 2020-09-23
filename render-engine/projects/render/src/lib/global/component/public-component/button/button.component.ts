import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

export type buttonAppearance = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'textButton' | 'other';

@Component({
  selector: 'rdr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

  @Input() disabled = false;
  @Input() styleType: buttonAppearance = 'primary';

  constructor() { }

  ngOnInit(): void {
  }
}
