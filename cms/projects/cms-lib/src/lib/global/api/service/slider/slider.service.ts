import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { SliderServiceError, CmsErrorHandler } from '../../../error-handling';
import { GetSliderTypeRangeResponseModel } from '../../data-model/models/get-slider-type-range-response.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  error = new SliderServiceError();

  constructor(
    private restAPIService: RestApiService,
  ) { }

  /**
   *
   *
   * @param {string} typeId
   * @returns
   * @memberof Form
   */
  getSliderTypeRange(typeId: string): Observable<GetSliderTypeRangeResponseModel> {
    if (!typeId) {
      throw new ParamsError('typeId', 'GetSliderTypeRange', 'string', typeId);
    }
    return this.restAPIService.GetSliderTypeRange({ typeId }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getSliderTypeRange')),
      ModelMapper.rxMapModelTo(GetSliderTypeRangeResponseModel),
    );
  }
}
