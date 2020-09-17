import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalService } from '../modal';
import { FarmService } from '../../../global/api/service';
import { concatMap } from 'rxjs/operators';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';
import { FarmSharedContainerModalComponent } from './component/farm-shared-container-modal/farm-shared-container-modal.component';
import { FormModalComponent } from './component/form-modal/form-modal.component';
import { ListFilesInfoModel } from '../../../global/api/data-model/models/list-files-info.model';

@Injectable({
  providedIn: 'root'
})
export class FarmSharedService {

  constructor(
    private farmService: FarmService,
    private modalService: ModalService,
  ) { }

  openFarm(funcID: string, fullScreen = true): Observable<any> {
    return this.modalService.openComponent({
      component: FarmSharedContainerModalComponent,
      componentInitData: {
        funcID,
      },
      modalSetting: {
        width: '1440px',
        maxHeight: '90%',
      }
    }, fullScreen);
  }

  openFarmPreview(funcID: string, dataID: string): Observable<any> {
    return of(undefined).pipe(
      concatMap(_ => this.farmService.getFarmDetailInfoByFuncID(funcID, dataID)),
      concatMap(farmFormInfo => {
        return this.modalService.openComponent({
          component: FarmFormViewDataModalComponent,
          componentInitData: {
            title: '預覽',
            funcID,
            farmFormInfo,
          },
          modalSetting: {
            width: '1440px',
            maxHeight: '90%',
          }
        });
      })
    );
  }

  openForm(componentInitData: { typeID?: string }): Observable<ListFilesInfoModel> {
    return this.modalService.openComponent({
      component: FormModalComponent,
      componentInitData
    });
  }

}
