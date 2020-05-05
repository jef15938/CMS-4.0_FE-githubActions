import { Component, OnInit } from '@angular/core';
import { CustomDialogActionButton, CustomDialogBase } from '../../custom-dialog-base';

@Component({
  selector: 'cms-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent extends CustomDialogBase implements OnInit {
  title: string | (() => string) = '';
  actions: CustomDialogActionButton[] = [
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
