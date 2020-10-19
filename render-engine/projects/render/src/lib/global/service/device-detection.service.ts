import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DeviceDetectionService {
  get deviceType(): 'pc' | 'mobile' | 'pad' | '' {
    if (!navigator?.userAgent) {
      return '';
    }
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'pad';
    }
    if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'pc';
  }
}
