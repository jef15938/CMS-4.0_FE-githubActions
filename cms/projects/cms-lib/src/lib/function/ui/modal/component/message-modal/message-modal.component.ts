import { Component, OnInit } from '@angular/core';
import { CustomModalBase } from '../../base/custom-modal-base';

@Component({
  selector: 'cms-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent extends CustomModalBase<MessageModalComponent, any> implements OnInit {
  title: string | (() => string) = '';

  message = '';

  constructor() { super(); }

  ngOnInit(): void {
  }

}
