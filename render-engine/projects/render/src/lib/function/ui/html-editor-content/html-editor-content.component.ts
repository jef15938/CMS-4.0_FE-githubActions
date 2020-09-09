import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { SitesResponseModel } from '../../../global/api/data-model/models/sites-response.model';

@Component({
  selector: 'rdr-html-editor-content',
  templateUrl: './html-editor-content.component.html',
  styleUrls: ['./html-editor-content.component.scss']
})
export class HtmlEditorContentComponent implements OnInit, AfterContentChecked {

  @Input() htmlString;
  @Input() runtime = false;
  @Input() sites: SitesResponseModel = null;

  html: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {

    const div = document.createElement('div');
    div.innerHTML = this.htmlString;

    const insides = div.querySelectorAll('a[urltype="INSIDE"]');
    insides.forEach(node => {
      if (!this.runtime) {
        const isHrefSet = !!node.getAttribute('nodeId');
        if (!isHrefSet) {
          const siteId = node.getAttribute('siteid');
          const nodeId = node.getAttribute('href');
          const href = SitesResponseModel.findContentPathBySiteIdAndNodeId(this.sites, siteId, nodeId);
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
