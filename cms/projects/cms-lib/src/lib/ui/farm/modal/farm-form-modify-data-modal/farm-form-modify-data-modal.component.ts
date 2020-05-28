import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal/custom-modal-base';
import { CmsFarmFormInfo } from 'projects/cms-lib/src/lib/type/farm.class';
import { FarmFormInfoComponent } from '../../component/farm-form-info/farm-form-info.component';
import { of } from 'rxjs';
import { concatMap, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'cms-farm-form-modify-data-modal',
  templateUrl: './farm-form-modify-data-modal.component.html',
  styleUrls: ['./farm-form-modify-data-modal.component.scss']
})
export class FarmFormModifyDataModalComponent extends CustomModalBase implements OnInit {

  @ViewChild(FarmFormInfoComponent) farmFormInfoComponent: FarmFormInfoComponent;

  title: string | (() => string);
  actions: CustomModalActionButton[] = [];

  @Input() farmFormInfo: CmsFarmFormInfo;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  confirm() {
    of(undefined).pipe(
      concatMap(_ => this.farmFormInfoComponent.requestFormInfo()),
      concatMap(formInfo => {
        // TODO: 新增/修改
        console.warn('formInfo = ', formInfo);
        return of(undefined);
      }),
    ).subscribe(() => this.close(true));
  }

}
