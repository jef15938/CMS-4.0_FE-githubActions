import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from '../../types';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { ContentInfoModel } from '../../api/data-model/models/content-info.model';
import { SiteMapGetResponseModel } from '../../api/data-model/models/site-map-get-response.model';
import { PageInfoGetResponseModel } from '../../api/data-model/models/page-info-get-response.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'rdr-render',
  templateUrl: './render.component.html',
  styles: [
  ]
})
export class RenderComponent implements OnInit {

  templates: LayoutInfo[];
  runtime = false;
  sites: SiteMapGetResponseModel = null;
  pageInfo: PageInfoGetResponseModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    this.runtime = url.indexOf('/preview/') < 0;



    const { pageInfo, sitemap, contentInfo } = this.activatedRoute.snapshot.data.data as PageData;

    this.sites = sitemap;
    this.pageInfo = pageInfo;

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

    this.createMetas(this.document, this.pageInfo);
  }

  private createMetas(document: Document, pageInfo: PageInfoGetResponseModel) {
    const metaTitle = pageInfo.metaTitle || '';
    const metaKeyword = pageInfo.metaKeyword || '';
    const metaDescription = pageInfo.metaDescription || '';
    const metaImage = pageInfo.metaImage || '';

    const titles = document.head.querySelectorAll('title');
    titles.forEach(title => title.innerText = metaTitle || '');

    const metas = [
      { key: 'title', value: metaTitle },
      { key: 'keywords', value: metaKeyword },
      { key: 'description', value: metaDescription },
      { key: 'image', value: metaImage },
    ];

    metas.map(meta => {
      const el = document.createElement('meta');
      el.setAttribute('name', meta.key);
      el.setAttribute('itemprop', meta.key);
      el.setAttribute('property', `og:${meta.key}`);
      el.setAttribute('content', meta.value);
      return el;
    }).forEach(metaEl => {
      document.head.appendChild(metaEl);
    });
  }

}
