import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../base/custom-modal-base';

@Component({
  selector: 'cms-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent extends CustomModalBase implements OnInit {
  title: string | (() => string) = '';
  actions: CustomModalActionButton[] = [
    {
      text: '取消',
      onClick: () => this.close(),
    },
    {
      text: '確認',
      onClick: () => this.confirm(),
    }
  ];

  message = '確認?';

  constructor() { super(); }

  ngOnInit(): void {
  }

  private confirm() {
    this.close(true);
  }

}
