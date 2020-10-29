import { ComponentRef, EmbeddedViewRef, Injector, ApplicationRef, ComponentFactoryResolver, Type } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { NxDialogComponent } from '@neux/ui';
import { ModalBase } from './modal-base';
import { ModalConfig } from './modal.interface';

export class ModalRef<R> {

  private static modalID = 0;

  private id = ++ModalRef.modalID;

  private dialogComponentRef: ComponentRef<NxDialogComponent>;
  private modalComponentRef: ComponentRef<ModalBase<R>>;

  get dialogInstance() { return this.dialogComponentRef?.instance; }
  get dialogElement() { return (this.dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement; }
  get modalInstance() { return this.modalComponentRef?.instance; }
  get modalElement() { return (this.modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement; }

  private returnValue: any;

  constructor(private injector: Injector) { }

  openComponent(component: Type<ModalBase<R>>, modalConfig?: ModalConfig): Observable<R> {
    const applicationRef = this.injector.get<ApplicationRef>(ApplicationRef);
    const componentFactoryResolver = this.injector.get<ComponentFactoryResolver>(ComponentFactoryResolver);

    const dialogComponentFactory = componentFactoryResolver.resolveComponentFactory(NxDialogComponent);
    const dialogComponentRef = dialogComponentFactory.create(this.injector);
    const dialogInstance = dialogComponentRef.instance;
    dialogInstance.hasBackdrop = true;
    dialogInstance.backdropClick = true;
    dialogInstance.width = modalConfig?.width || dialogInstance.width;
    applicationRef.attachView(dialogComponentRef.hostView);
    const dialogInstanceElement = (dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const dialogInstanceContentElement = dialogInstanceElement.querySelector('div.dialog__content');

    const modalComponentFactory = componentFactoryResolver.resolveComponentFactory(component);
    const modalComponentRef = modalComponentFactory.create(this.injector);
    const modalInstance = modalComponentRef.instance;
    // tslint:disable-next-line: no-string-literal
    modalInstance['modalRef'] = this;
    applicationRef.attachView(modalComponentRef.hostView);
    const modalInstanceElement = (modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    dialogInstanceContentElement.appendChild(modalInstanceElement);

    this.dialogComponentRef = dialogComponentRef;
    this.modalComponentRef = modalComponentRef;

    dialogInstance.show();

    return new Observable((subscriber: Subscriber<R>) => {
      const afterHide = this.dialogInstance.afterHide.subscribe(() => {
        if (!this.dialogComponentRef.hostView.destroyed) {
          this.modalComponentRef.destroy();
          this.dialogComponentRef.destroy();
        } else {
          afterHide.unsubscribe();
          subscriber.next(this.returnValue);
          subscriber.complete();
          subscriber.unsubscribe();
        }
      });
    });
  }

  close(returnValue?: R) {
    this.returnValue = returnValue;
    this.dialogInstance.hide();
  }

}
