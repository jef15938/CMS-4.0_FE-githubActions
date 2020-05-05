import { Component, OnInit } from '@angular/core';
import { CustomDialogBase, CustomDialogActionButton } from '../../custom-dialog-base';

@Component({
  selector: 'cms-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent extends CustomDialogBase implements OnInit {
  title: string | (() => string) = '';
  actions: CustomDialogActionButton[] = [
    {
      text: '取消',
      onClick: () => this.close(),
    },
    {
      text: '確認',
      onClick: () => this._confirm(),
    }
  ];

  message = '確認?';

  constructor() { super() }

  ngOnInit(): void {
  }

  private _confirm() {
    this.close(true);
  }

}
