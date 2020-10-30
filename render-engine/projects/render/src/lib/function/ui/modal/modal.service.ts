import { Injectable, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalRef } from './modal-ref';
import { ModalBase } from './modal-base';
import { ModalConfig } from './modal.interface';

@Injectable({ providedIn: 'root' })
export class ModalSevice {

  private static modalList: ModalRef<any>[] = [];

  constructor(
    private injector: Injector,
  ) { }

  closeAll() {
    ModalSevice.modalList.forEach(modal => {
      modal.close();
    });
  }

  openComponent<R>(component: Type<ModalBase<R>>, modalConfig?: ModalConfig): Observable<R> {
    const modal = new ModalRef<R>(this.injector);
    ModalSevice.modalList.push(modal);
    return modal.openComponent(component, modalConfig).pipe(
      tap(_ => ModalSevice.modalList.splice(ModalSevice.modalList.indexOf(modal), 1))
    );
  }
}
