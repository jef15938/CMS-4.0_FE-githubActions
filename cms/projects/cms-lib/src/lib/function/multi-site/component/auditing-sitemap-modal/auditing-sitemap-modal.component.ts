import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../ui/modal';
import { SitemapService } from '../../../../global/api/service';
import { SiteMapNodeInfo } from '../../../../global/api/neuxAPI/bean/SiteMapNodeInfo';
import { CmsDateAdapter } from '../../../../global/util/mat-date/mat-date';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsFormValidator } from '../../../../global/util/form-validator';

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
      startTime: [startTime, Validators.compose([Validators.required])],
      endTime: [endTime, Validators.compose([Validators.required])],
      memo: ['', Validators.compose([Validators.required])],
    }, {
      validators: [
        CmsFormValidator.startTimeEndTime('startTime', 'endTime'),
      ],
    });
  }

  ngOnInit(): void {

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
