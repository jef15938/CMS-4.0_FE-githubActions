import { Component, OnInit, Inject, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalOpenComponentConfig } from '../modal.interface';
import { ModalCustomWrapperDirective } from './modal-custom-wrapper.directive';
import { CustomModalBase } from '../custom-modal-base';

@Component({
  selector: 'cms-modal-custom-wrapper',
  templateUrl: './modal-custom-wrapper.component.html',
  styleUrls: ['./modal-custom-wrapper.component.scss']
})
export class ModalCustomWrapperComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalCustomWrapperDirective) customRenderWrapper: ModalCustomWrapperDirective;

  instance: CustomModalBase;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _config: ModalOpenComponentConfig<any>,
    private _modalRef: MatDialogRef<ModalCustomWrapperComponent>,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.renderCustom();
  }

  renderCustom() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._config.component as any);
    const wrapper = this.customRenderWrapper;
    wrapper.viewContainerRef.clear();
    const componentRef = wrapper.viewContainerRef.createComponent(componentFactory);
    const instance = componentRef.instance as CustomModalBase;
    if (this._config.componentInitData) {
      for (let k of Object.keys(this._config.componentInitData)) {
        instance[k] = this._config.componentInitData[k];
      }
    }
    instance.modalRef = this._modalRef;
    this.instance = instance;
    this._changeDetectorRef.detectChanges();
  }

  getInstanceTitle(): string {
    if (!this.instance || !this.instance.title) { return ''; }
    if (typeof (this.instance.title) === 'string') { return this.instance.title; }
    return this.instance.title() || '';
  }

}
