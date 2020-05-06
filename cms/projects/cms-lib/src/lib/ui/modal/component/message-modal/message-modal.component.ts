import { Component, OnInit } from '@angular/core';
import { CustomModalActionButton, CustomModalBase } from '../../custom-modal-base';

@Component({
  selector: 'cms-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent extends CustomModalBase implements OnInit {
  title: string | (() => string) = '';
  actions: CustomModalActionButton[] = [
    {
      text: '取消',
      onClick: () => this.close(),
    },
  ];

  message = '';

  constructor() { super() }

  ngOnInit(): void {
  }

}
