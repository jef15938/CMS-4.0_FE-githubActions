import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';
import { GalleryGetResponse } from '../neuxAPI/bean/GalleryGetResponse';
import { Observable } from 'rxjs';
import { GalleryCategoryInfo } from '../neuxAPI/bean/GalleryCategoryInfo';
import { map } from 'rxjs/operators';
import { GalleryCaregoryGetResponse } from '../neuxAPI/bean/GalleryCaregoryGetResponse';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private respAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {string} categoryName required
   * @param {string} assignDeptId required
   * @param {string} parentId optional
   * @returns
   * @memberof GalleryService
   */
  createGalleryCategory(categoryName: string, assignDeptId: string, parentId?: string) {
    if (!categoryName) { throw new ParamsError('categoryName', 'createGalleryCategory', 'string', categoryName); }
    if (!assignDeptId) { throw new ParamsError('assignDeptId', 'createGalleryCategory', 'string', assignDeptId); }

    const params: { [k: string]: any } = {
      category_name: categoryName,
      assign_dept_id: assignDeptId,
    };

    if (parentId) {
      params.parent_id = parentId;
    }

    return this.respAPIService.dispatchRestApi('PostGalleryCategory', params);
  }

  /**
   *
   *
   * @param {string} categoryID
   * @returns
   * @memberof GalleryService
   */
  deleteGalleryCategory(categoryID: string) {
    if (!categoryID) {
      throw new ParamsError('categoryID', 'deleteGalleryCategory', 'string', categoryID);
    }
    return this.respAPIService.dispatchRestApi('DeleteGalleryCategoryByCategoryID', { categoryID });
  }

  /**
   *
   *
   * @param {string} categoryID
   * @returns
   * @memberof GalleryService
   */
  getGalleryByCategoryID(categoryID: string, page = 1): Observable<GalleryGetResponse> {
    if (!categoryID) {
      throw new ParamsError('categoryID', 'deleteGalleryCategory', 'string', categoryID);
    }
    return this.respAPIService.dispatchRestApi('GetGalleryByCategoryID', { categoryID, page });
  }

  /**
   *
   *
   * @returns
   * @memberof GalleryService
   */
  getGalleryCategory(): Observable<GalleryCategoryInfo[]> {
    return this.respAPIService.dispatchRestApi('GetGalleryCategory', {}).pipe(
      map((res: GalleryCaregoryGetResponse) => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} categoryID
   * @returns
   * @memberof GalleryService
   */
  putGalleryCategoryByCategoryID(categoryID: string) {
    if (!categoryID) {
      throw new ParamsError('categoryID', 'deleteGalleryCategory', 'string', categoryID);
    }
    return this.respAPIService.dispatchRestApi('PutGalleryCategoryByCategoryID', { categoryID });
  }


}
