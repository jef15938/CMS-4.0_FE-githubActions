import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { SitemapNode } from '../../interface';

@Component({
  selector: 'rdr-layout-full',
  templateUrl: './layout-full.component.html',
  styleUrls: ['./layout-full.component.scss']
})
export class LayoutFullComponent extends CommonTemplateBaseComponent implements OnInit {
  defaultTemplateInfo: LayoutInfo;
  templateInfo: LayoutInfo;
  menu: SitemapNode;
  tool: SitemapNode;

  constructor(injector: Injector) {
    super(injector);
    this.templateInfo = {
      id: '',
      templateId: 'layoutFull',
      fields: [],
      attributes: {},
      children: [
        {
          id: '',
          templateId: 'Slide',
          fields: [],
          source: '',
          attributes: {
            height: '592px'
          }
        } as any
      ]
    };

    this.menu = [
      { nodeName: '關於台壽', children: [{ nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }, { nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }, { nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }] },
      { nodeName: '商品資訊', children: [{ nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }, { nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }] },
      { nodeName: '投資理財', children: [{ nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }] },
      { nodeName: '保戶服務', children: [{ nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }, { nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }] },
      { nodeName: '最新消息', children: [{ nodeName: '第二層項目', children: [{ nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }, { nodeName: '第三層項目', children: [] }] }] }
    ] as any;
  }

  ngOnInit(): void {
  }

}
