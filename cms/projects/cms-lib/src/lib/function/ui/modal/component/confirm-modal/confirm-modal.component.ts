import { Component, OnInit, Input } from '@angular/core';
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
      class: 'btn btn-cancel'
    },
    {
      text: '確認',
      onClick: () => this.confirm(),
      class: 'btn btn-confirm'
    }
  ];

  message = '確認?';
  @Input() confirmBtnMessage = '';
  @Input() cancelBtnMessage = '';

  constructor() { super(); }

  ngOnInit(): void {
    if (this.cancelBtnMessage) { this.actions[0].text = this.cancelBtnMessage; }
    if (this.confirmBtnMessage) { this.actions[1].text = this.confirmBtnMessage; }
  }

  private confirm() {
    this.close(true);
  }

}
