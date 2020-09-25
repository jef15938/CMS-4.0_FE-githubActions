import { Inject, PLATFORM_ID, Injectable } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface MetaConfig {
  title: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  metaImage: string;
  domain: string;
}

@Injectable()
export class MetaService {
  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  setPageMeta(metaConfig: MetaConfig) {
    const isBrowser = isPlatformBrowser(this.platformId);
    if (isBrowser) { return; } // 產檔時產生 meta 就好
    this.createMetas(this.document, metaConfig);
  }

  private createMetas(document: Document, metaConfig: MetaConfig) {

    const title = metaConfig.title || '';
    const metaTitle = metaConfig.metaTitle || '';
    const metaKeyword = metaConfig.metaKeyword || '';
    const metaDescription = metaConfig.metaDescription || '';
    const metaImage = metaConfig.metaImage || '';
    const domain = metaConfig.domain || '';

    const titles = Array.from(document.head.querySelectorAll('title'));
    titles.forEach(t => t.innerText = title);

    const metas = [
      { key: 'title', value: metaTitle },
      { key: 'keywords', value: metaKeyword },
      { key: 'description', value: metaDescription },
      { key: 'image', value: metaImage },
      { key: 'url', value: domain },
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
