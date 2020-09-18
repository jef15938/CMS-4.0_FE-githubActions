import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListFilesInfoModel } from '../../../global/api/data-model/models/list-files-info.model';
import { ModalService } from '../modal';
import { FormModalComponent } from './form-modal/form-modal.component';

@Injectable({ providedIn: 'root' })
export class FormSharedService {

  constructor(
    private modalService: ModalService
  ) { }

  openForm(componentInitData: { typeID?: string }): Observable<ListFilesInfoModel> {
    return this.modalService.openComponent({
      component: FormModalComponent,
      componentInitData
    });
  }
}
