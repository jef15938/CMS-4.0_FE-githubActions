import { Component, OnInit } from '@angular/core';
import { CustomModalActionButton, CustomModalBase } from '../../base/custom-modal-base';

@Component({
  selector: 'cms-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent extends CustomModalBase<MessageModalComponent, any> implements OnInit {
  title: string | (() => string) = '';
  actions: CustomModalActionButton[] = [];

  message = '';

  constructor() { super(); }

  ngOnInit(): void {
  }

}
