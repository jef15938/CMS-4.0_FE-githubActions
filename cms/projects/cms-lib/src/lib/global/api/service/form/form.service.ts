import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { FormServiceError, CmsErrorHandler } from '../../../error-handling';
import { ListFormTypeResponseModel } from '../../data-model/models/list-form-type-response.model';
import { ListFilesResponseModel } from '../../data-model/models/list-files-response.model';
import { ListFormTypeInfoModel } from '../../data-model/models/list-form-type-info.model';
import { ListFilesInfoModel } from '../../data-model/models/list-files-info.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  error = new FormServiceError();

  constructor(
    private restAPIService: RestApiService,
  ) { }

  /**
   *
   *
   * @returns
   * @memberof Form
   */
  ListFormType(): Observable<ListFormTypeInfoModel[]> {
    return this.restAPIService.ListFormType({}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('ListFormType')),
      ModelMapper.rxMapModelTo(ListFormTypeResponseModel),
      map(x => x.datas),
    );
  }

  /**
   *
   *
   * @param {string} typeID
   * @returns
   * @memberof Form
   */
  ListFiles(typeID: string): Observable<ListFilesInfoModel[]> {
    if (!typeID) {
      throw new ParamsError('typeID', 'ListFiles', 'string', typeID);
    }
    return this.restAPIService.ListFiles({ typeID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('ListFiles')),
      ModelMapper.rxMapModelTo(ListFilesResponseModel),
      map(x => x.datas),
    );
  }
}