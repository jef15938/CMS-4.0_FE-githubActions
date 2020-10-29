import { Injector } from '@angular/core';
import { ModalSevice } from '@neux/render';
import { TestModalComponent } from '../component/test-modal/test-modal.component';

export const customActions = {
  datas: [
    {
      actionID: 'action-1',
      actionName: '動作一',
      fn: (injector: Injector) => {
        const modalService = injector.get<ModalSevice>(ModalSevice);
        modalService.openComponent(TestModalComponent, { width: 600 }).subscribe(result => {
          console.warn('result = ', result);
        });
      }
    },
    {
      actionID: 'action-2',
      actionName: '動作二',
      fn: (injector: Injector) => { alert('動作二'); }
    },
    {
      actionID: 'action-3',
      actionName: '動作三',
      fn: (injector: Injector) => { alert('動作三'); }
    },
    {
      actionID: 'action-4',
      actionName: '動作四',
      fn: (injector: Injector) => { alert('動作四'); }
    }
  ]
};
