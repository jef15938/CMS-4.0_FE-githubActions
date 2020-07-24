import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalService } from '../modal';
import { FarmService } from '../../../global/api/service';
import { concatMap } from 'rxjs/operators';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';

@Injectable({
  providedIn: 'root'
})
export class FarmSharedService {

  constructor(
    private farmService: FarmService,
    private modalService: ModalService,
  ) { }

  openFarmPreview(funcID: string, dataID: string): Observable<any> {
    return of(undefined).pipe(
      concatMap(_ => this.farmService.getFarmDetailInfoByFuncID(funcID, dataID)),
      concatMap(farmFormInfo => {
        return this.modalService.openComponent({
          component: FarmFormViewDataModalComponent,
          componentInitData: {
            title: '預覽',
            farmFormInfo,
          },
          modalSetting: {
            width: '1440px',
          }
        });
      })
    );
  }

}
