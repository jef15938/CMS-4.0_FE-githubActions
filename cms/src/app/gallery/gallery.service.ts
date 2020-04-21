import { Injectable } from '@angular/core';
import { RestApiService } from 'src/neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private respAPIService: RestApiService
  ) { }

  createGalleryCategory() {
    // TODO: api Path not correct
    return this.respAPIService.dispatchRestApi('PostGalleryCategoryByCategoryID', {});
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


}
