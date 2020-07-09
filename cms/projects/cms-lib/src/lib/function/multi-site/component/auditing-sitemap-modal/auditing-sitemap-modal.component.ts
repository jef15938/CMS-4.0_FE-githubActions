import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../ui/modal';
import { SitemapService } from '../../../../global/api/service';
import { SiteMapNodeInfo } from '../../../../global/api/neuxAPI/bean/SiteMapNodeInfo';
import { CmsDateAdapter } from '../../../../global/util/mat-date/mat-date';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'cms-auditing-sitemap-modal',
  templateUrl: './auditing-sitemap-modal.component.html',
  styleUrls: ['./auditing-sitemap-modal.component.scss']
})
export class AuditingSitemapModalComponent extends CustomModalBase implements OnInit {
  title = '節點送審';
  actions: CustomModalActionButton[];

  @Input() siteId: string;
  @Input() sitemapNode: SiteMapNodeInfo;

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private siteMapService: SitemapService,
    private cmsDateAdapter: CmsDateAdapter,
  ) {
    super();
    const now = new Date();
    const startTime = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`);
    const endTime = new Date(`9999/12/31`);

    this.form = formBuilder.group({
      startTime: [startTime, Validators.compose([Validators.required, this.timeValidator('startTime')])],
      endTime: [endTime, Validators.compose([Validators.required, this.timeValidator('endTime')])],
      memo: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {

  }

  timeValidator(formControlName: 'startTime' | 'endTime'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.form) {
        let oppositeControl: AbstractControl;
        let startTime: Date;
        let endTime: Date;
        if (formControlName === 'startTime') {
          startTime = control.value;
          oppositeControl = this.form.get('endTime');
          endTime = oppositeControl.value;
        } else if (formControlName === 'endTime') {
          oppositeControl = this.form.get('startTime');
          startTime = oppositeControl.value;
          endTime = control.value;
        }

        if (!(endTime > startTime)) {
          const error = {
            startTimeEndTime: '結束時間需大於開始時間'
          };
          oppositeControl.setErrors(error);
          return error;
        }
      }
      return null;
    };
  }

  confirm() {
    this.siteMapService.auditingSitemap(
      this.sitemapNode.node_id,
      this.cmsDateAdapter.format(this.form.controls.startTime.value),
      this.cmsDateAdapter.format(this.form.controls.endTime.value),
      this.form.controls.memo.value,
      this.siteId,
    ).subscribe(_ => {
      this.close('Created');
    });
  }

}
