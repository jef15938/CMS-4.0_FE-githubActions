import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { FarmService } from '../../../../../global/api/service';
import { FarmInfo } from '../../../../../global/model/farm.model';

@Component({
  selector: 'cms-farm-shared-container-modal',
  templateUrl: './farm-shared-container-modal.component.html',
  styleUrls: ['./farm-shared-container-modal.component.scss']
})
export class FarmSharedContainerModalComponent extends CustomModalBase implements OnInit {

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @Input() funcID: string;

  farm: FarmInfo;

  constructor(
    private farmService: FarmService,
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-farm-shared-container-modal');
    this.farmService.getFarmByFuncID(this.funcID).subscribe(farm => {
      this.farm = farm;
    });
  }

}
