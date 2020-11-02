import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, ModalService } from '../../../modal';
import { ContentService } from '../../../../../global/api/service';
import { ColDef } from '../../../table';
import { ContentVersionInfoModel } from '../../../../../global/api/data-model/models/content-version-info.model';
import { CmsErrorHandler } from '../../../../../global/error-handling';

@Component({
  selector: 'cms-content-version-recover-modal',
  templateUrl: './content-version-recover-modal.component.html',
  styleUrls: ['./content-version-recover-modal.component.scss']
})
export class ContentVersionRecoverModalComponent extends CustomModalBase<ContentVersionRecoverModalComponent, ContentVersionInfoModel>
  implements OnInit {
  title = '歷史版本';

  @Input() contentID = '';

  versions: ContentVersionInfoModel[] = [];

  colDefs: ColDef<ContentVersionInfoModel>[] = [
    {
      colId: 'version',
      field: 'version',
      title: '版本號',
    },
    {
      colId: 'createTime',
      field: 'createTime',
      title: '建立時間',
      format: 'DATETIME',
    },
    {
      colId: 'createBy',
      field: 'createBy',
      title: '建立者',
    },
  ];

  constructor(
    private contentService: ContentService,
    private modalService: ModalService,
  ) { super(); }

  ngOnInit(): void {
    this.contentService.getContentVersionByContentID(this.contentID)
      .pipe(CmsErrorHandler.rxHandleError())
      .subscribe(versions => this.versions = versions);
  }

  onRowClick(version: ContentVersionInfoModel) {
    this.modalService.openConfirm({ message: `版本號 : ${version.version}`, title: `確定回到此版本 ?` }).subscribe(confirm => {
      if (confirm) {
        this.close(version);
      }
    });
  }

}
