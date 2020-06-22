import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '@cms-lib/ui/modal';
import { CmsFarmFormInfo } from '@cms-lib/type';

@Component({
  selector: 'cms-farm-form-view-data-modal',
  templateUrl: './farm-form-view-data-modal.component.html',
  styleUrls: ['./farm-form-view-data-modal.component.scss']
})
export class FarmFormViewDataModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string);
  actions: CustomModalActionButton[] = [];

  @Input() farmFormInfo: CmsFarmFormInfo;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
