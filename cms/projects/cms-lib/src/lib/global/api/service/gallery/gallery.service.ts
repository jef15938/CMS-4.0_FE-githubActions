import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subscription, of } from 'rxjs';
import { map, catchError, tap, last } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GalleryGetResponse } from '../../neuxAPI/bean/GalleryGetResponse';
import { GalleryCategoryInfo } from '../../neuxAPI/bean/GalleryCategoryInfo';
import { GalleryCaregoryGetResponse } from '../../neuxAPI/bean/GalleryCaregoryGetResponse';
import { CMS_ENVIROMENT_TOKEN } from '../../../injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../interface/cms-enviroment.interface';

export class FileUploadModel {
  fileName: string;
  fileSize: number;
  fileType: string;
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  success: boolean;
  sub?: Subscription;
}

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
  getGalleryByCategoryID(categoryID: string, page = 1, filter?: { fileName?: string, fileType?: string }): Observable<GalleryGetResponse> {
    if (!categoryID) {
      throw new ParamsError('categoryID', 'deleteGalleryCategory', 'string', categoryID);
    }

    const params: {
      categoryID: string,
      page: number,
      fileName?: string,
      fileType?: string,
    } = { categoryID, page };

    if (filter?.fileName) { params.fileName = filter.fileName; }
    if (filter?.fileType) { params.fileType = filter.fileType; }

    return this.respAPIService.dispatchRestApi('GetGalleryByCategoryID', params);
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

  deleteGallery(galleryID: number) {
    return this.httpClient.delete(`https://cms.decoder.com.tw/Gallery/${galleryID}`, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  createGallery(file: FileUploadModel, categoryID: string) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('description', file.data.name);
    const req = new HttpRequest('POST', `${this.apiUrl}/${categoryID}`, formData, {
      reportProgress: true
    });
    file.success = false;
    file.canCancel = true;
    return this.httpClient.request(req).pipe(
      map(event => {
        // console.warn('uploadFile() event = ', event);
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            return null;
          case HttpEventType.Response:
            return event.body;
        }
        return null;
      }),
      last(),
      catchError((error: HttpErrorResponse) => {
        console.error(`${file.data.name} upload failed.`, error);
        return of({ success: false });
      }),
      map((res: { success: boolean }) => res?.success || false),
      map(success => {
        file.success = success;
        file.inProgress = false;
        file.canRetry = !success;
        file.canCancel = false;
        return file;
      })
    );
  }

  updateGallery(file: FileUploadModel, galleryID: number) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('description', file.data.name);
    const req = new HttpRequest('POST', `${this.apiUrl}/${galleryID}`, formData, {
      reportProgress: true
    });
    file.success = false;
    file.canCancel = true;
    return this.httpClient.request(req).pipe(
      map(event => {
        // console.warn('uploadFile() event = ', event);
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            return null;
          case HttpEventType.Response:
            return event.body;
        }
        return null;
      }),
      last(),
      catchError((error: HttpErrorResponse) => {
        console.error(`${file.data.name} upload failed.`, error);
        return of({ success: false });
      }),
      map((res: { success: boolean }) => res?.success || false),
      map(success => {
        file.success = success;
        file.inProgress = false;
        file.canRetry = !success;
        file.canCancel = false;
        return file;
      })
    );
  }

  mapFileToFileUploadModel(file: File): FileUploadModel {
    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      data: file,
      state: '',
      inProgress: false,
      progress: 0,
      canRetry: false,
      canCancel: true,
      success: false,
    };
  }

}
