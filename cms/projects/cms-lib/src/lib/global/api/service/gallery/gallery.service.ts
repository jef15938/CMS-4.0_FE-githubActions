import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GalleryGetResponse } from '../../neuxAPI/bean/GalleryGetResponse';
import { GalleryCategoryInfo } from '../../neuxAPI/bean/GalleryCategoryInfo';
import { GalleryCaregoryGetResponse } from '../../neuxAPI/bean/GalleryCaregoryGetResponse';
import { CMS_ENVIROMENT_TOKEN } from '../../../injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../interface/cms-enviroment.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl = '';

  constructor(
    private respAPIService: RestApiService,
    private httpClient: HttpClient,
    @Inject(CMS_ENVIROMENT_TOKEN) environment: CmsEnviroment,
  ) {
    this.apiUrl = `${environment.apiBaseUrl}/Gallery`;
  }

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
      .put(url, formData, { headers }).pipe(
        tap(res => console.log('updateGallery response = ', res)),
        catchError((e) => {
          console.error('error = ', e);
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
      .post(url, formData, { headers }).pipe(
        tap(res => console.log('upload response = ', res)),
        catchError((e) => {
          console.error('error = ', e);
          return throwError(e);
        }),
      );
  }

  getGalleryShowUrl() {
    return `${this.apiUrl}/Show`;
  }

  getGalleryShowUrlByGalleryID(galleryID: number) {
    return `${this.getGalleryShowUrl()}/${galleryID}`;
  }


}
