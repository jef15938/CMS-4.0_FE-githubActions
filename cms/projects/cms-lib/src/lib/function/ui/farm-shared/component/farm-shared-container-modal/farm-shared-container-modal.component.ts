import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { FarmService } from '../../../../../global/api/service';
import { FarmInfoGetResponseModel } from '../../../../../global/api/data-model/models/farm-info-get-response.model';
import { CmsErrorHandler } from '../../../../../global/error-handling';

@Component({
  selector: 'cms-farm-shared-container-modal',
  templateUrl: './farm-shared-container-modal.component.html',
  styleUrls: ['./farm-shared-container-modal.component.scss']
})
export class FarmSharedContainerModalComponent extends CustomModalBase implements OnInit {

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @Input() funcID: string;

  farm: FarmInfoGetResponseModel;

  constructor(
    private farmService: FarmService,
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-farm-shared-container-modal');
    this.farmService.getFarmByFuncID(this.funcID)
      .pipe(CmsErrorHandler.rxHandleError('取得 Farm 資料錯誤'))
      .subscribe(farm => {
        this.farm = farm;
      });
  }

}
