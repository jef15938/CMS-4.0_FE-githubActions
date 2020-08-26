import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { map, catchError, last } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GalleryGetResponse } from '../../neuxAPI/bean/GalleryGetResponse';
import { GalleryCaregoryGetResponse } from '../../neuxAPI/bean/GalleryCaregoryGetResponse';
import { CMS_ENVIROMENT_TOKEN } from '../../../injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../interface/cms-enviroment.interface';
import { GalleryGetResponseModel } from '../../data-model/models/gallery-get-response.model';
import { ModelMapper } from '@neux/core';
import { GalleryCategoryInfoModel } from '../../data-model/models/gallery-category-info.model';
import { GalleryCategoryGetResponseModel } from '../../data-model/models/gallery-category-get-response.model';
import { GalleryCategoryPutRequest } from '../../neuxAPI/bean/GalleryCategoryPutRequest';
import { GalleryConfigResponse } from '../../neuxAPI/bean/GalleryConfigResponse';
import { GalleryConfigResponseModel } from '../../data-model/models/gallery-config-response.model';

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

    const requestBody: Partial<GalleryCategoryPutRequest> = {
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
  getGalleryByCategoryID(categoryID: string, page = 1, filter?: { fileName?: string, fileTypes?: string[] }):
    Observable<GalleryGetResponseModel> {
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
    if (filter?.fileTypes?.length) { params.fileType = filter.fileTypes.join(','); }

    return this.respAPIService.dispatchRestApi<GalleryGetResponse>('GetGalleryByCategoryID', params).pipe(
      ModelMapper.rxMapModelTo(GalleryGetResponseModel),
    );
  }

  /**
   *
   *
   * @returns
   * @memberof GalleryService
   */
  getGalleryCategory(): Observable<GalleryCategoryInfoModel[]> {
    return this.respAPIService.dispatchRestApi<GalleryCaregoryGetResponse>('GetGalleryCategory', {}).pipe(
      ModelMapper.rxMapModelTo(GalleryCategoryGetResponseModel),
      map(res => res.datas)
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

    const requestBody: Partial<GalleryCategoryPutRequest> = {
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
    const req = new HttpRequest('PUT', `${this.apiUrl}/${galleryID}`, formData, {
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

  getGalleryConfig(): Observable<GalleryConfigResponseModel> {
    return this.respAPIService.dispatchRestApi<GalleryConfigResponse>('GetGalleryConfig', {}).pipe(
      ModelMapper.rxMapModelTo(GalleryConfigResponseModel),
    );
  }

}
