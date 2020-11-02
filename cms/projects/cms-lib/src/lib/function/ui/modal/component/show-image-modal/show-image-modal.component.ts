import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase } from '../../base/custom-modal-base';

@Component({
  selector: 'cms-show-image-modal',
  templateUrl: './show-image-modal.component.html',
  styleUrls: ['./show-image-modal.component.scss']
})
export class ShowImageModalComponent extends CustomModalBase<ShowImageModalComponent, any> implements OnInit {
  title: string | (() => string) = '';

  @Input() imageUrl = '';

  constructor() { super(); }

  ngOnInit(): void { }

}
