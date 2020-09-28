import { Component, Inject, ViewChild, ComponentRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalOpenComponentConfig } from '../modal.interface';
import { CustomModalBase } from '../base/custom-modal-base';
import { DynamicWrapperDirective } from '@neux/core';

@Component({
  selector: 'cms-modal-custom-wrapper',
  templateUrl: './modal-custom-wrapper.component.html',
  styleUrls: ['./modal-custom-wrapper.component.scss']
})
export class ModalCustomWrapperComponent {

  @ViewChild(DynamicWrapperDirective) dynamicWrapperDirective: DynamicWrapperDirective<CustomModalBase<any, any>>;

  componentClass;

  instance: CustomModalBase<any, any>;

  instanceTitle = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalOpenComponentConfig<any, any>,
    public modalRef: MatDialogRef<ModalCustomWrapperComponent>,
  ) { }

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
