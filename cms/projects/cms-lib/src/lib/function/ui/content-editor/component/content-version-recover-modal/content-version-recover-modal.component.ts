import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton, ModalService } from '../../../modal';
import { ContentService } from '../../../../../global/api/service';
import { ContentVersionInfo } from '../../../../../global/api/neuxAPI/bean/ContentVersionInfo';
import { ColDef } from '../../../table';

@Component({
  selector: 'cms-content-version-recover-modal',
  templateUrl: './content-version-recover-modal.component.html',
  styleUrls: ['./content-version-recover-modal.component.scss']
})
export class ContentVersionRecoverModalComponent extends CustomModalBase implements OnInit {
  title = '歷史版本';
  actions: CustomModalActionButton[];

  @Input() contentID = '';

  versions: ContentVersionInfo[] = [];

  colDefs: ColDef[] = [
    {
      colId: 'version',
      field: 'version',
      title: '版本號',
    },
    {
      colId: 'create_time',
      field: 'create_time',
      title: '建立時間',
      format: 'DATETIME',
    },
    {
      colId: 'create_by',
      field: 'create_by',
      title: '建立者',
    },
  ];

  constructor(
    private contentService: ContentService,
    private modalService: ModalService,
  ) { super(); }

  ngOnInit(): void {
    this.contentService.getContentVersionByContentID(this.contentID).subscribe(versions => this.versions = versions);
  }

  onRowClick(version: ContentVersionInfo) {
    this.modalService.openConfirm({ message: `版本號 : ${version.version}`, title: `確定回到此版本 ?` }).subscribe(confirm => {
      if (confirm) {
        this.close(version);
      }
    });
  }

}
