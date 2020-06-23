import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { CmsFarmFormInfo } from './../../../../type';
import { CustomModalBase, CustomModalActionButton } from './../../../../ui/modal';
import { FarmFormInfoComponent } from '../../component/farm-form-info/farm-form-info.component';

@Component({
  selector: 'cms-farm-form-modify-data-modal',
  templateUrl: './farm-form-modify-data-modal.component.html',
  styleUrls: ['./farm-form-modify-data-modal.component.scss']
})
export class FarmFormModifyDataModalComponent extends CustomModalBase implements OnInit, AfterContentChecked {

  @ViewChild(FarmFormInfoComponent) farmFormInfoComponent: FarmFormInfoComponent;

  title: string | (() => string);
  actions: CustomModalActionButton[] = [];

  @Input() farmFormInfo: CmsFarmFormInfo;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
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
