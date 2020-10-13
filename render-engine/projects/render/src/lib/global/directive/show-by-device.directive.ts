import { Directive, Input, TemplateRef, ViewContainerRef, Inject, PLATFORM_ID, OnChanges, SimpleChanges } from '@angular/core';
import { DeviceDetectionService } from '../service/device-detection.service';
import { SiteMapInfoModel } from '../api/data-model/models/site-map-info.model';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[rdrShownByDevice]' })
export class ShownByDeviceDirective implements OnChanges {

  @Input() set rdrShownByDevice(pageNode: SiteMapInfoModel) {
    this.pageNode = pageNode;
  }

  @Input() set rdrShownByDeviceRuntime(runtime: boolean) {
    this.runtime = runtime;
  }

  private pageNode: SiteMapInfoModel;
  private runtime = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private deviceDetectionService: DeviceDetectionService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const runtime = this.runtime;
    const node = this.pageNode;
    console.warn({runtime, node});
    this.viewContainer.clear();
    if (this.canRender(this.pageNode)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.document) {
        const h1 = (this.document as Document).createElement('h1');
        h1.innerText = `頁面不支援您的裝置 : ${this.deviceDetectionService.deviceType}`;
        this.document.body.appendChild(h1);
      }
    }
  }

  private canRender(pageNode: SiteMapInfoModel) {
    if (!isPlatformBrowser(this.platformId)) { return true; }
    if (!this.runtime) { return true; }
    if (!pageNode?.device) { return true; }
    const pageDevices = pageNode.device.split(',');
    const deviceType = this.deviceDetectionService.deviceType;
    return pageDevices.indexOf(deviceType) > -1;
  }

}
