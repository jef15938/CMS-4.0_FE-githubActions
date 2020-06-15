import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';
import { GalleryGetResponse } from '../neuxAPI/bean/GalleryGetResponse';
import { Observable, throwError } from 'rxjs';
import { GalleryCategoryInfo } from '../neuxAPI/bean/GalleryCategoryInfo';
import { map, catchError, tap } from 'rxjs/operators';
import { GalleryCaregoryGetResponse } from '../neuxAPI/bean/GalleryCaregoryGetResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private respAPIService: RestApiService,
    private httpClient: HttpClient,
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

    const requestBody: { [k: string]: any } = {
      category_name: categoryName,
      assign_dept_id: assignDeptId,
    };

    if (parentId) {
      requestBody.parent_id = parentId;
    }

    return this.respAPIService.dispatchRestApi('PostGalleryCategory', { requestBody });
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
  putGalleryCategoryByCategoryID(categoryID: string, categoryName: string, assignDeptId: string, parentId?: string) {
    if (!categoryID) {
      throw new ParamsError('categoryID', 'deleteGalleryCategory', 'string', categoryID);
    }

    const requestBody: { [k: string]: any } = {
      category_name: categoryName,
      assign_dept_id: assignDeptId,
    };

    if (parentId) {
      requestBody.parent_id = parentId;
    }

    return this.respAPIService.dispatchRestApi('PutGalleryCategoryByCategoryID', { categoryID, requestBody });
  }

  updateGallery(fileToUpload: File, galleryID: number) {
    const headers = null;
    const url = `https://cms.decoder.com.tw/Gallery/${galleryID}`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('description', 'description');
    return this.httpClient
      .put(url, formData, { headers: headers }).pipe(
        tap(res => console.log('updateGallery response = ', res)),
        catchError((e) => {
          console.error('error = ', e)
          return throwError(e);
        }),
      );
  }

  deleteGallery(galleryID: number) {
    return this.httpClient.delete(`https://cms.decoder.com.tw/Gallery/${galleryID}`, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  createGallery(fileToUpload: File, categoryID: string) {
    const headers = null;
    const url = `https://cms.decoder.com.tw/Gallery/${categoryID}`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('description', 'description');
    return this.httpClient
      .post(url, formData, { headers: headers }).pipe(
        tap(res => console.log('upload response = ', res)),
        catchError((e) => {
          console.error('error = ', e)
          return throwError(e);
        }),
      );
  }


}
