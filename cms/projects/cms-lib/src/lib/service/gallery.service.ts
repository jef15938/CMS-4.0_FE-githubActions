import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';

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
  getGalleryByCategoryID(categoryID: string) {
    if (!categoryID) {
      throw new ParamsError('categoryID', 'deleteGalleryCategory', 'string', categoryID);
    }
    return this.respAPIService.dispatchRestApi('GetGalleryByCategoryID', { categoryID });

  }

  /**
   *
   *
   * @returns
   * @memberof GalleryService
   */
  getGalleryCategory() {
    return this.respAPIService.dispatchRestApi('GetGalleryCategory', {});
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
