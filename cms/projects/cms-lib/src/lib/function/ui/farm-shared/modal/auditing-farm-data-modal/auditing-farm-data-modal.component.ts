import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomModalBase, CustomModalActionButton } from './../../../modal';
import { FarmService } from '../../../../../global/api/service';
import { CmsDateAdapter } from '../../../../../global/util/mat-date/mat-date';
import { CmsFormValidator } from '../../../../../global/util/form-validator';
import { CmsErrorHandler } from '../../../../../global/error-handling';

@Component({
  selector: 'cms-auditing-farm-data-modal',
  templateUrl: './auditing-farm-data-modal.component.html',
  styleUrls: ['./auditing-farm-data-modal.component.scss']
})
export class AuditingFarmDataModalComponent extends CustomModalBase implements OnInit {
  title = '送審';
  actions: CustomModalActionButton[];

  @Input() dataId: string;
  @Input() funcId: string;

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private farmService: FarmService,
    private cmsDateAdapter: CmsDateAdapter,
  ) {
    super();
    const now = new Date();
    const startTime = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`);
    const endTime = new Date(`9999/12/31`);

    this.form = formBuilder.group({
      startTime: [startTime, Validators.compose([Validators.required])],
      endTime: [endTime, Validators.compose([Validators.required])],
      memo: ['頁面送審', Validators.compose([Validators.required])],
    }, {
      validators: [
        CmsFormValidator.startTimeEndTime('startTime', 'endTime'),
      ],
    });
  }

  ngOnInit(): void {

  }

  confirm() {
    this.farmService.auditingFarmData(
      this.funcId,
      this.dataId,
      this.cmsDateAdapter.format(this.form.controls.startTime.value),
      this.cmsDateAdapter.format(this.form.controls.endTime.value),
      this.form.controls.memo.value,
    ).pipe(CmsErrorHandler.rxHandleError('送審錯誤')).subscribe(_ => {
      this.close('Created');
    });
  }

}
