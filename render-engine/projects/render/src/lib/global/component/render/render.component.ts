import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from '../../types/_index';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { ContentInfoModel } from '../../api/data-model/models/content-info.model';
import { MetaService } from '../../service/meta.service';
import { SiteMapInfoModel } from '../../api/data-model/models/site-map-info.model';
import { SiteInfoModel } from '../../api/data-model/models/site-info.model';
import { isPlatformBrowser } from '@angular/common';
import { SitemapUtil } from '../../utils/sitemap-util';
import { RenderPageStore, RenderPageState } from '../../component-store/render-page.store';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'rdr-render',
  templateUrl: './render.component.html',
  providers: [
    RenderPageStore
  ]
})
export class RenderComponent implements OnInit {

  templates: LayoutInfo[];

  renderPageState: RenderPageState;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: any,
    private readonly renderPageStore: RenderPageStore,
  ) {
    renderPageStore.state$.pipe(
      // takeUntil(this.destroy$),
      tap(state => this.renderPageState = state),
    ).subscribe(state => {
      console.warn('RenderComponent state = ', state);
    });
  }

  ngOnInit(): void {
    // 路由切換時，重新設定渲染畫面
    this.activatedRoute.params.subscribe(_ => this.setPages());
  }


  /**
   * 設定該節點渲染畫面
   * @private
   * @return {*}
   * @memberof RenderComponent
   */
  private setPages() {
    const url = this.router.url;
    const isBrowser = isPlatformBrowser(this.platformId);
    const isRuntime = url.indexOf('/preview/') < 0;
    const isPreview = !isRuntime;
    const isRender = true;
    const isEditor = !isRender;

    const { pageInfo, sitemap, contentInfo, pageNode } = this.activatedRoute.snapshot.data.data as PageData;

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

    this.renderPageStore.setState({
      isBrowser, isEditor, isRender, isPreview, isRuntime, pageInfo, pageNode, sitemap
    });

    const title = this.getPageTitleByNode(sitemap.sites, pageNode, pageInfo.lang) || pageInfo.domain;
    this.metaService.setPageTitle(title);

    if (isBrowser) { return; } // 產檔時產生 meta 就好
    this.metaService.setPageMeta({ ...pageInfo });
  }

  private getPageTitleByNode(sites: SiteInfoModel[], node: SiteMapInfoModel, lang: string): string {
    if (!sites?.length || !node) { return ''; }

    sites = sites || [];
    return sites.map(site => {
      const flattenedNodes = SitemapUtil.flattenNodes(site.siteMap);
      if (flattenedNodes.indexOf(node) < 0) { return; }

      const flattenedParents = this.getFlattenedParentsByNode(flattenedNodes, node);
      return [node, ...flattenedParents]
        .map(n => n.languages?.find(l => l.languageId === lang)?.nodeName || '')
        .filter(v => !!v)
        .join(' - ');
    }).find(v => !!v);
  }

  private getFlattenedParentsByNode(
    sources: SiteMapInfoModel[],
    node: SiteMapInfoModel,
    result: SiteMapInfoModel[] = []
  ): SiteMapInfoModel[] {
    if (!sources.length || !node) { return result; }

    const parent = sources.find(n => n.children.some(c => c.nodeId === node.nodeId));
    if (!parent) { return result; }

    const parentIndexInSources = sources.indexOf(parent);
    const newSources = [...sources];
    newSources.splice(parentIndexInSources, 1);

    return this.getFlattenedParentsByNode(newSources, parent, [...result, parent]);
  }

}
