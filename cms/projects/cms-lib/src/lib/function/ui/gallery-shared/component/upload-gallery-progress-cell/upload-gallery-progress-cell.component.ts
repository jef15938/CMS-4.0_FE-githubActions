import { Component, OnInit, Inject } from '@angular/core';
import { CustomCellRenderer, CmsTable } from '../../../../ui/table';
import { CMS_ENVIROMENT_TOKEN } from '../../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../../global/interface';
import { FileUploadModel } from '../../../../../global/api/service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'cms-gallery-progress-cell',
  templateUrl: './upload-gallery-progress-cell.component.html',
  styleUrls: ['./upload-gallery-progress-cell.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UploadGalleryProgressCellComponent implements CustomCellRenderer, OnInit {

  config: { data: FileUploadModel, table: CmsTable };

  constructor(
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
  ) { }

  ngOnInit(): void {
  }

  compInit(config: { data: FileUploadModel, table: CmsTable }) {
    this.config = config;
  }

}
