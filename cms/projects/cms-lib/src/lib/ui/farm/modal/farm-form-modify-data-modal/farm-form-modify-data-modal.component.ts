import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal/custom-modal-base';
import { CmsFarmFormInfo } from 'projects/cms-lib/src/lib/type/farm.class';

@Component({
  selector: 'cms-farm-form-modify-data-modal',
  templateUrl: './farm-form-modify-data-modal.component.html',
  styleUrls: ['./farm-form-modify-data-modal.component.scss']
})
export class FarmFormModifyDataModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string);
  actions: CustomModalActionButton[] = [];

  @Input() farmFormInfo: CmsFarmFormInfo;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  confirm() {
    alert(`修改成功`);
    this.close(true);
  }

}
