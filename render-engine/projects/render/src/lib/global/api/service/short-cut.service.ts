import { Injectable } from '@angular/core';
import { ModelMapper } from '@neux/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ShortCutResponseModel } from '../data-model/models/short-cut-response.model';
import { ShortCutObjectModel } from '../data-model/models/short-cut-object-model';

@Injectable({ providedIn: 'root' })

export class ShortCutService {
  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   * @returns
   * @memberof ShortCutService
   */
  getShortCut(): Observable<ShortCutObjectModel[]> {
    return this.restAPIService.GetShortCut({}).pipe(
      ModelMapper.rxMapModelTo(ShortCutResponseModel),
      map(x => x.datas),
    );
  }
}
