import { Component, Inject, ViewChild, ComponentRef, AfterViewInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DynamicWrapperDirective } from '@neux/core';
import { ModalOpenComponentConfig } from '../modal.interface';
import { CustomModalBase } from '../base/custom-modal-base';

@Component({
  selector: 'cms-modal-custom-wrapper',
  templateUrl: './modal-custom-wrapper.component.html',
  styleUrls: ['./modal-custom-wrapper.component.scss']
})
export class ModalCustomWrapperComponent implements AfterViewInit, OnDestroy {

  @ViewChild(DynamicWrapperDirective) dynamicWrapperDirective: DynamicWrapperDirective<CustomModalBase<any, any>>;
  @ViewChild('closeBtn', { read: ViewContainerRef }) closeBtn: ViewContainerRef;

  componentClass;

  instance: CustomModalBase<any, any>;

  instanceTitle = '';

  private mutationObserver: MutationObserver;

  private destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalOpenComponentConfig<any, any>,
    public modalRef: MatDialogRef<ModalCustomWrapperComponent>,
    private viewContainerRef: ViewContainerRef,
  ) {
    modalRef.addPanelClass(['cms-modal', 'overflow-hidden']);
  }

  ngAfterViewInit(): void {
    if (this.closeBtn) {
      this.observeCloseBtn();
    }
    this.modalRef.removePanelClass(['overflow-hidden']);
    this.modalRef.beforeClosed().subscribe(_ => {
      this.modalRef.addPanelClass(['overflow-hidden']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.mutationObserver?.disconnect();
  }

  private observeCloseBtn() {
    const selfEl = this.viewContainerRef.element.nativeElement as HTMLElement;
    const parentEl = selfEl.parentElement;
    const overlayPanelEl = parentEl.parentElement;
    const btnEl = this.closeBtn.element.nativeElement as HTMLElement;
    this.calculateCloseBtnPosition(btnEl, overlayPanelEl);
    setTimeout(() => {
      // btnEl.style.transition = '0.5s';
      btnEl.style.opacity = '1';
      // setTimeout(() => {
      //   btnEl.style.transition = '';
      // }, 501);
    }, 250);

    const mutationObserver = new MutationObserver((records) => {
      this.calculateCloseBtnPosition(btnEl, overlayPanelEl);
    });

    mutationObserver.observe(overlayPanelEl, {
      attributeOldValue: true,
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });

    this.mutationObserver = mutationObserver;

    fromEvent(window, 'resize').pipe(
      takeUntil(this.destroy$),
      tap(_ => this.calculateCloseBtnPosition(btnEl, overlayPanelEl)),
    ).subscribe();
  }

  private calculateCloseBtnPosition(btnEl: HTMLElement, overlayPanelEl: HTMLElement) {
    btnEl.style.top = `${overlayPanelEl.offsetTop}px`;
    btnEl.style.left = `${overlayPanelEl.offsetLeft + overlayPanelEl.offsetWidth}px`;
  }

  onComponentLoad = (componentRef: ComponentRef<CustomModalBase<any, any>>) => {
    const instance = componentRef.instance;
    if (this.config.componentInitData) {
      for (const k of Object.keys(this.config.componentInitData)) {
        instance[k] = this.config.componentInitData[k];
      }
    }
    instance.modalRef = this.modalRef;
    this.instance = instance;
    setTimeout(() => {
      this.instanceTitle = this.getInstanceTitle();
    }, 0.5);
  }

  getInstanceTitle(): string {
    if (!this.instance || !this.instance.title) { return ''; }
    if (typeof (this.instance.title) === 'string') { return this.instance.title; }
    return this.instance.title() || '';
  }

}
