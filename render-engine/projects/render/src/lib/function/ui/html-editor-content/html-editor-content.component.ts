import { Component, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SitemapUtil } from '../../../global/utils/sitemap-util';
import { SiteInfoModel } from '../../../global/api/data-model/models/site-info.model';
import { RenderedPageEnvironment } from '../../../global/interface/page-environment.interface';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../../../global/injection-token/injection-token';


@Component({
  selector: 'rdr-html-editor-content',
  templateUrl: './html-editor-content.component.html',
  styleUrls: ['./html-editor-content.component.scss']
})
export class HtmlEditorContentComponent implements OnChanges {

  @Input() htmlString;
  @Input() sites: SiteInfoModel[] = [];

  html: string;

  constructor(
    private router: Router,
    @Inject(RENDERED_PAGE_ENVIRONMENT_ROKEN) private pageEnv: RenderedPageEnvironment,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const div = document.createElement('div');
    div.innerHTML = this.htmlString;

    const insides = div.querySelectorAll('a[urltype="INSIDE"]');
    insides.forEach(node => {
      if (this.pageEnv.isRuntime) {
        const isHrefSet = !!node.getAttribute('nodeId');
        if (!isHrefSet) {
          const siteId = node.getAttribute('siteid');
          const nodeId = node.getAttribute('href');
          const sites = this.sites;
          const href = SitemapUtil.findContentPathBySiteIdAndNodeId(sites, siteId, nodeId);
          if (href) {
            node.setAttribute('nodeId', nodeId);
            const paths = this.router.url.split('/').filter(v => !!v);
            paths[paths.length - 1] = href;
            node.setAttribute('href', `/${paths.join('/')}`);
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
