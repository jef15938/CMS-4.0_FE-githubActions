import { Directive, TemplateRef, ViewContainerRef, Inject, OnDestroy } from '@angular/core';
import { DeviceDetectionService } from '../service/device-detection.service';
import { DOCUMENT } from '@angular/common';
import { RenderPageStore, RenderPageState } from '../component-store/render-page.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: '[rdrShownByDevice]' })
export class ShownByDeviceDirective implements OnDestroy {

  private destroy$ = new Subject<any>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private deviceDetectionService: DeviceDetectionService,
    @Inject(DOCUMENT) private document: any,
    renderPageStore: RenderPageStore,
  ) {
    renderPageStore.state$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(state => this.renderView(state));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private renderView(renderPageState: RenderPageState) {
    this.viewContainer.clear();
    if (this.canRender(renderPageState)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.document) {
        const h1 = (this.document as Document).createElement('h1');
        h1.innerText = `頁面不支援您的裝置 : ${this.deviceDetectionService.deviceType}`;
        this.document.body.appendChild(h1);
      }
    }
  }

  private canRender(renderPageState: RenderPageState) {
    if (!renderPageState.isBrowser) { return true; }
    if (!renderPageState.isRender) { return true; }
    if (!renderPageState.pageNode.device) { return true; }
    const pageDevices = renderPageState.pageNode.device.split(',');
    const deviceType = this.deviceDetectionService.deviceType;
    return pageDevices.indexOf(deviceType) > -1;
  }

}
