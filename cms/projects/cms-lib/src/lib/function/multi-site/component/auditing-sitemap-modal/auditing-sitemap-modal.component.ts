import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase } from './../../../ui/modal';
import { SitemapService } from '../../../../global/api/service';
import { CmsDateAdapter } from '../../../../global/util/mat-date/mat-date';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsFormValidator } from '../../../../global/util/form-validator';
import { SiteMapNodeGetResponseModel } from '../../../../global/api/data-model/models/site-map-node-get-response.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { CmsLoadingToggle } from '../../../../global/service';

@Component({
  selector: 'cms-auditing-sitemap-modal',
  templateUrl: './auditing-sitemap-modal.component.html',
  styleUrls: ['./auditing-sitemap-modal.component.scss']
})
export class AuditingSitemapModalComponent extends CustomModalBase<AuditingSitemapModalComponent, 'Success'> implements OnInit {
  title = '節點送審';

  @Input() siteId: string;
  @Input() sitemapNode: SiteMapNodeGetResponseModel;

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private siteMapService: SitemapService,
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
    this.siteMapService.auditingSitemap(
      this.sitemapNode.nodeId,
      this.cmsDateAdapter.format(this.form.controls.startTime.value),
      this.cmsDateAdapter.format(this.form.controls.endTime.value),
      this.form.controls.memo.value,
      this.siteId,
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
