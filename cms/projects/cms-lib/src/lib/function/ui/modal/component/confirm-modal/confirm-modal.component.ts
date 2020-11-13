import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase } from '../../base/custom-modal-base';

@Component({
  selector: 'cms-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent extends CustomModalBase<ConfirmModalComponent, boolean> implements OnInit {
  title: string | (() => string) = '';

  @Input() message = '確認?';
  @Input() confirmBtnMessage = '確認';
  @Input() cancelBtnMessage = '取消';

  constructor() { super(); }

  ngOnInit(): void { }

  confirm() {
    this.close(true);
  }

  cancel() {
    this.close(false);
  }

}
