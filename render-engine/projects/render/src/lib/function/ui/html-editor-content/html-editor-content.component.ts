import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SiteMapGetResponseModel } from '../../../global/api/data-model/models/site-map-get-response.model';


@Component({
  selector: 'rdr-html-editor-content',
  templateUrl: './html-editor-content.component.html',
  styleUrls: ['./html-editor-content.component.scss']
})
export class HtmlEditorContentComponent implements OnInit, OnChanges {

  @Input() htmlString;
  @Input() runtime = false;
  @Input() sites: SiteMapGetResponseModel = null;

  html: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const div = document.createElement('div');
    div.innerHTML = this.htmlString;

    const insides = div.querySelectorAll('a[urltype="INSIDE"]');
    insides.forEach(node => {
      if (this.runtime) {
        const isHrefSet = !!node.getAttribute('nodeId');
        if (!isHrefSet) {
          const siteId = node.getAttribute('siteid');
          const nodeId = node.getAttribute('href');
          const href = SiteMapGetResponseModel.findContentPathBySiteIdAndNodeId(this.sites, siteId, nodeId);
          if (href) {
            node.setAttribute('nodeId', nodeId);
            node.setAttribute('href', href);
          }
        }
      } else {
        node.removeAttribute('target');
        node.removeAttribute('href');
        node.setAttribute('href', 'javascript: void(0)');
      }
    });

    this.html = div.innerHTML;
  }

}
