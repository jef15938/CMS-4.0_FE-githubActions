import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class GTagService {

  private static isInited = false;

  init(platformId: any, gaTrackingId: string) {
    if (GTagService.isInited) {
      console.warn('GTagService.init(). GTagService is already inited.');
      return;
    }

    const isBrowser = isPlatformBrowser(platformId);
    if (!isBrowser) {
      console.warn('GTagService.init(). Platform is not browser.');
      return;
    }

    if (!gaTrackingId) {
      console.warn('GTagService.init(). No gaTrackingId.');
      return;
    }

    console.log('GTagService.init()', { gaTrackingId });

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`);
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    // tslint:disable-next-line: only-arrow-functions
    (window as any).gtag = function () {
      (window as any).dataLayer.push(arguments);
    };

    (window as any).gtag('js', new Date());
    (window as any).gtag('config', gaTrackingId);

    GTagService.isInited = true;
    console.log('GTagService inited');
  }

  gtag(...args) {
    if (!GTagService.isInited) {
      console.warn('GTagService.gtag(). GTagService is not inited.');
      return;
    }
    (window as any).gtag(args);
  }
}

