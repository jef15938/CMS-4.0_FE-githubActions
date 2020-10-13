import { Directive, Input, TemplateRef, ViewContainerRef, Inject, PLATFORM_ID } from '@angular/core';
import { DeviceDetectionService } from '../service/device-detection.service';
import { SiteMapInfoModel } from '../api/data-model/models/site-map-info.model';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[rdrShownByDevice]' })
export class ShownByDeviceDirective {

  @Input() set rdrShownByDevice(pageNode: SiteMapInfoModel) {
    this.viewContainer.clear();
    if (this.canRender(pageNode)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.document) {
        const h1 = (this.document as Document).createElement('h1');
        h1.innerText = `頁面不支援您的裝置 : ${this.deviceDetectionService.deviceType}`;
        this.document.body.appendChild(h1);
      }
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private deviceDetectionService: DeviceDetectionService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: any,
  ) { }

  private canRender(pageNode: SiteMapInfoModel) {
    if (!isPlatformBrowser(this.platformId)) { return true; }
    if (!pageNode?.device) { return true; }
    const pageDevices = pageNode.device.split(',');
    const deviceType = this.deviceDetectionService.deviceType;
    return pageDevices.indexOf(deviceType) > -1;
  }

}
