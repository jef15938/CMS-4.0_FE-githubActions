import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { FarmFormInfoModel } from '../../../../../global/api/data-model/models/farm-form-info.model';

@Component({
  selector: 'cms-farm-form-view-data-modal',
  templateUrl: './farm-form-view-data-modal.component.html',
  styleUrls: ['./farm-form-view-data-modal.component.scss']
})
export class FarmFormViewDataModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string);
  actions: CustomModalActionButton[] = [];

  @Input() funcID: string;
  @Input() farmFormInfo: FarmFormInfoModel;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
