import { Component, OnInit, Inject, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalOpenComponentConfig } from '../modal.interface';
import { ModalCustomWrapperDirective } from './modal-custom-wrapper.directive';
import { CustomModalBase } from '../base/custom-modal-base';

@Component({
  selector: 'cms-modal-custom-wrapper',
  templateUrl: './modal-custom-wrapper.component.html',
  styleUrls: ['./modal-custom-wrapper.component.scss']
})
export class ModalCustomWrapperComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalCustomWrapperDirective) customRenderWrapper: ModalCustomWrapperDirective;

  instance: CustomModalBase;

  instanceTitle = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private config: ModalOpenComponentConfig<any>,
    private modalRef: MatDialogRef<ModalCustomWrapperComponent>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.renderCustom();
    this.changeDetectorRef.detectChanges();
  }

  renderCustom() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.component as any);
    const wrapper = this.customRenderWrapper;
    wrapper.viewContainerRef.clear();
    const componentRef = wrapper.viewContainerRef.createComponent(componentFactory);
    const instance = componentRef.instance as CustomModalBase;
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
