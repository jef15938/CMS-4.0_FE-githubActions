import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { FarmFormInfoComponent } from '../../component/farm-form-info/farm-form-info.component';
import { FarmService } from '../../../../../global/api/service';
import { FarmFormInfoModel } from '../../../../../global/api/data-model/models/farm-form-info.model';
import { CmsErrorHandler } from '../../../../../global/error-handling';
import { CmsLoadingToggle } from '../../../../../global/service/cms-loading-toggle.service';

@Component({
  selector: 'cms-farm-form-modify-data-modal',
  templateUrl: './farm-form-modify-data-modal.component.html',
  styleUrls: ['./farm-form-modify-data-modal.component.scss']
})
export class FarmFormModifyDataModalComponent extends CustomModalBase<FarmFormModifyDataModalComponent, 'Success'>
  implements OnInit, AfterContentChecked {

  @ViewChild(FarmFormInfoComponent) farmFormInfoComponent: FarmFormInfoComponent;

  title: string | (() => string) = '';
  actions: CustomModalActionButton[] = [];

  @Input() farmFormInfo: FarmFormInfoModel;
  @Input() action: 'create' | 'edit';
  @Input() funcID: string;
  @Input() dataID: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private farmService: FarmService,
    private cmsLoadingToggle: CmsLoadingToggle,
  ) {
    super();
  }

  ngOnInit(): void {
    this.title = this.action === 'create' ? '新增' : '修改';
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  confirm() {
    of(undefined).pipe(
      concatMap(_ => this.farmFormInfoComponent.getFormInfo()),
      concatMap(formInfo => {
        const formData = new FormData();
        formInfo.columns.forEach(col => {
          formData.append(col.columnId, col.value);
        });
        this.cmsLoadingToggle.open();
        if (this.action === 'create') {
          return this.farmService.createFarmForm(this.funcID, formData);
        } else {
          return this.farmService.updateFarmForm(this.funcID, this.dataID, formData);
        }
      }),
    ).pipe(
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        this.cmsLoadingToggle.close();
        showMessage();
      })
    ).subscribe(() => {
      this.cmsLoadingToggle.close();
      this.close('Success');
    });
  }

}
