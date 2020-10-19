import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from '../../types';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { ContentInfoModel } from '../../api/data-model/models/content-info.model';
import { PageInfoGetResponseModel } from '../../api/data-model/models/page-info-get-response.model';
import { MetaService } from '../../service/meta.service';
import { SiteMapInfoModel } from '../../api/data-model/models/site-map-info.model';
import { SiteInfoModel } from '../../api/data-model/models/site-info.model';
import { isPlatformBrowser } from '@angular/common';
import { SitemapUtil } from '../../utils/sitemap-util';
import { RenderedPageEnvironment } from '../../interface/page-environment.interface';

const RENDERED_PAGE_ENVIRONMENT: RenderedPageEnvironment = {
  pageSites: [],
  pageNode: null,
  pageLang: '',
  isBrowser: true,
  isRuntime: false,
};

@Component({
  selector: 'rdr-render',
  templateUrl: './render.component.html',
  providers: [
    { provide: 'RENDER_ENGINE_RENDERED_PAGE_ENVIRONMENT', useValue: RENDERED_PAGE_ENVIRONMENT }
  ]
})
export class RenderComponent implements OnInit {

  templates: LayoutInfo[];
  runtime = false;
  sites: SiteInfoModel[] = [];
  pageInfo: PageInfoGetResponseModel;
  pageNode: SiteMapInfoModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  ngOnInit(): void {

    const url = this.router.url;
    this.runtime = url.indexOf('/preview/') < 0;

    const { pageInfo, sitemap, contentInfo, pageID } = this.activatedRoute.snapshot.data.data as PageData;
    this.sites = sitemap.sites || [];
    console.warn('this.sites = ', this.sites);
    this.pageInfo = pageInfo;
    const pageNode = SitemapUtil.findNodeByContentPathFromSites(this.sites, pageID);
    this.pageNode = pageNode;
    const isBrowser = isPlatformBrowser(this.platformId);

    RENDERED_PAGE_ENVIRONMENT.pageSites = this.sites;
    RENDERED_PAGE_ENVIRONMENT.pageLang = this.pageInfo?.lang || '';
    RENDERED_PAGE_ENVIRONMENT.pageNode = pageNode;
    RENDERED_PAGE_ENVIRONMENT.isRuntime = this.runtime;
    RENDERED_PAGE_ENVIRONMENT.isBrowser = isBrowser;

    const templateList = ContentInfoModel.getTemplateInfoByLanguageId(contentInfo, pageInfo.lang);
    // 把最外層Layout也放入TemplateList中，sitemap當作Data
    this.templates = [{
      id: '',
      templateId: pageInfo.layoutId,
      fields: [],
      children: templateList,
      attributes: {
        sitemap: null // TODO: 修正
      }
    }];
    console.warn('this.templates = ', this.templates);

    const title = this.getPageTitleByNode(this.sites, pageNode, this.pageInfo.lang) || this.pageInfo.domain;
    this.metaService.setPageTitle(title);

    if (isBrowser) { return; } // 產檔時產生 meta 就好
    this.metaService.setPageMeta({ ...this.pageInfo });
  }

  private getPageTitleByNode(sites: SiteInfoModel[], node: SiteMapInfoModel, lang: string): string {
    if (!sites?.length || !node) { return ''; }

    sites = sites || [];
    return sites.map(site => {
      const flattenedNodes = SitemapUtil.flattenNodes(site.siteMap);
      if (flattenedNodes.indexOf(node) < 0) { return; }

      const flattenedParents = this.getFlattenedParentsFromNode(flattenedNodes, node);
      return [node, ...flattenedParents]
        .map(n => n.languages?.find(l => l.languageId === lang)?.nodeName || '')
        .filter(v => !!v)
        .join(' - ');
    }).find(v => !!v);
  }

  private getFlattenedParentsFromNode(
    sources: SiteMapInfoModel[],
    node: SiteMapInfoModel,
    result: SiteMapInfoModel[] = []
  ): SiteMapInfoModel[] {
    if (!sources.length || !node) { return result; }

    const parent = sources.find(n => n.children.indexOf(node) > 0);
    if (!parent) { return result; }

    const parentIndexInSources = sources.indexOf(parent);
    const newSources = [...sources];
    newSources.splice(parentIndexInSources, 1);

    return this.getFlattenedParentsFromNode(newSources, parent, [...result, parent]);
  }

}
