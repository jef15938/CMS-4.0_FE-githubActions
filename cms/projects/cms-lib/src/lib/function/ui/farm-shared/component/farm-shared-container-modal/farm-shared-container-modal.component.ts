import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase } from '../../../modal';
import { FarmService } from '../../../../../global/api/service';
import { FarmInfoGetResponseModel } from '../../../../../global/api/data-model/models/farm-info-get-response.model';
import { CmsErrorHandler } from '../../../../../global/error-handling';

@Component({
  selector: 'cms-farm-shared-container-modal',
  templateUrl: './farm-shared-container-modal.component.html',
  styleUrls: ['./farm-shared-container-modal.component.scss']
})
export class FarmSharedContainerModalComponent extends CustomModalBase<FarmSharedContainerModalComponent, any> implements OnInit {

  @Input() title: string | (() => string) = '';

  @Input() funcID: string;

  farm: FarmInfoGetResponseModel;

  constructor(
    private farmService: FarmService,
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-farm-shared-container-modal');
    this.farmService.getFarmByFuncID(this.funcID)
      .pipe(CmsErrorHandler.rxHandleError())
      .subscribe(farm => {
        this.farm = farm;
      });
  }

}
