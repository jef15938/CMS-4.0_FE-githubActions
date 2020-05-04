import { Component, OnInit, Inject, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOpenComponentConfig } from '../dialog.interface';
import { DialogCustomWrapperDirective } from './dialog-custom-wrapper.directive';
import { CustomDialogBase } from '../custom-dialog-base';

@Component({
  selector: 'cms-dialog-custom-wrapper',
  templateUrl: './dialog-custom-wrapper.component.html',
  styleUrls: ['./dialog-custom-wrapper.component.scss']
})
export class DialogCustomWrapperComponent implements OnInit, AfterViewInit {

  @ViewChild(DialogCustomWrapperDirective) customRenderWrapper: DialogCustomWrapperDirective;

  instance: CustomDialogBase;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _config: DialogOpenComponentConfig<any>,
    private _dialogRef: MatDialogRef<DialogCustomWrapperComponent>,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    if (_config && _config.dialogSetting) {

    }
  }

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
    const instance = componentRef.instance as CustomDialogBase;
    if (this._config.componentInitData) {
      for (let k of Object.keys(this._config.componentInitData)) {
        instance[k] = this._config.componentInitData[k];
      }
    }
    instance.dialogRef = this._dialogRef;
    this.instance = instance;
    this._changeDetectorRef.detectChanges();
  }

  getInstanceTitle(): string {
    if (!this.instance || !this.instance.title) { return ''; }
    if (typeof (this.instance.title) === 'string') { return this.instance.title; }
    return this.instance.title() || '';
  }

}
