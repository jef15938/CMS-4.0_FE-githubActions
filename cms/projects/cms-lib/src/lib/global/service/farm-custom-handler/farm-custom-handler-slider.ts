import { FarmCustomHandler } from '../../../function/ui/farm-shared/farm-shared.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SliderService } from '../../api/service/slider/slider.service';
import { FarmFormInfoModelColumn, FarmFormInfoModel } from '../../api/data-model/models/farm-form-info.model';
import { CmsErrorHandler } from '../../error-handling/cms-error-handler';
import { ModalService } from '../../../function/ui/modal/modal.service';

export class FarmCustomHandlerSlider implements FarmCustomHandler {

  readonly funcId = 'slider';

  constructor(
    private sliderService: SliderService,
    private modalService: ModalService,
  ) {

  }

  onFormGalleryColumnBeforeSelectImage(
    column: FarmFormInfoModelColumn,
    farmFormInfo: FarmFormInfoModel,
  ): Observable<any> {
    const typeColumn = farmFormInfo.columns.find(c => c.columnId === 'publishChannel');

    if (!typeColumn) {
      return this.modalService.openMessage({ message: '找不到分類欄位' });
    }

    const typeId = typeColumn.value;
    if (!typeId) {
      return this.modalService.openMessage({ message: '請先選擇分類' });
    }

    return this.sliderService.getSliderTypeRange(typeId).pipe(
      tap(res => {
        column.setting.imgLimitHeight = res.height;
        column.setting.imgLimitWidth = res.width;
      }),
      CmsErrorHandler.rxHandleError(),
    );
  }
}
