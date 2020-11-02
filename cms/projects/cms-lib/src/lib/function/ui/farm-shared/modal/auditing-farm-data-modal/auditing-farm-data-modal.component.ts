import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomModalBase } from './../../../modal';
import { FarmService } from '../../../../../global/api/service';
import { CmsDateAdapter } from '../../../../../global/util/mat-date/mat-date';
import { CmsFormValidator } from '../../../../../global/util/form-validator';
import { CmsErrorHandler } from '../../../../../global/error-handling';
import { CmsLoadingToggle } from '../../../../../global/service/cms-loading-toggle.service';

@Component({
  selector: 'cms-auditing-farm-data-modal',
  templateUrl: './auditing-farm-data-modal.component.html',
  styleUrls: ['./auditing-farm-data-modal.component.scss']
})
export class AuditingFarmDataModalComponent extends CustomModalBase<AuditingFarmDataModalComponent, 'Success'> implements OnInit {
  title = '送審';

  @Input() dataId: string;
  @Input() funcId: string;

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private farmService: FarmService,
    private cmsDateAdapter: CmsDateAdapter,
    private cmsLoadingToggle: CmsLoadingToggle,
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
    this.cmsLoadingToggle.open();
    this.farmService.auditingFarmData(
      this.funcId,
      this.dataId,
      this.cmsDateAdapter.format(this.form.controls.startTime.value),
      this.cmsDateAdapter.format(this.form.controls.endTime.value),
      this.form.controls.memo.value,
    ).pipe(
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        this.cmsLoadingToggle.close();
        showMessage();
      })
    ).subscribe(_ => {
      this.cmsLoadingToggle.close();
      this.close('Success');
    });
  }

}
