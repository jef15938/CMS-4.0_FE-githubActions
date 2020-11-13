import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface MetaConfig {
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
  ) { }

  setPageTitle(title: string) {
    title = title || '';
    const titles = Array.from(document.head.querySelectorAll('title'));
    titles.forEach(t => t.innerText = title);
  }

  setPageMeta(metaConfig: MetaConfig) {
    this.createMetas(this.document, metaConfig);
  }

  private createMetas(document: Document, metaConfig: MetaConfig) {

    const metaTitle = metaConfig.metaTitle || '';
    const metaKeyword = metaConfig.metaKeyword || '';
    const metaDescription = metaConfig.metaDescription || '';
    const metaImage = metaConfig.metaImage || '';
    const domain = metaConfig.domain || '';

    const metas = [
      { key: 'title', value: metaTitle },
      { key: 'keywords', value: metaKeyword },
      { key: 'description', value: metaDescription },
      { key: 'image', value: metaImage },
      { key: 'url', value: domain },
    ];

    const fragment = document.createDocumentFragment();
    metas.map(meta => {
      const el = document.createElement('meta');
      el.setAttribute('name', meta.key);
      el.setAttribute('itemprop', meta.key);
      el.setAttribute('property', `og:${meta.key}`);
      el.setAttribute('content', meta.value);
      return el;
    }).forEach(metaEl => {
      fragment.appendChild(metaEl);
    });
    document.head.appendChild(fragment);
  }
}
