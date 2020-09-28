import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { map, catchError, last } from 'rxjs/operators';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { CMS_ENVIROMENT_TOKEN } from '../../../injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../interface/cms-enviroment.interface';
import { GalleryGetResponseModel } from '../../data-model/models/gallery-get-response.model';
import { GalleryCategoryInfoModel } from '../../data-model/models/gallery-category-info.model';
import { GalleryCategoryGetResponseModel } from '../../data-model/models/gallery-category-get-response.model';
import { GalleryCategoryPutRequest } from '../../neuxAPI/bean/GalleryCategoryPutRequest';
import { GalleryConfigResponseModel } from '../../data-model/models/gallery-config-response.model';
import { GalleryServiceError, CmsErrorHandler } from '../../../error-handling';
import { SaveGalleryResponseModel } from '../../data-model/models/save-gallery-response.model';
import { GetSliderTypeRangeResponseModel } from '../../data-model/models/get-slider-type-range-response.model';
import { SaveFileResponseModel } from '../../data-model/models/save-file-response.model';
import { GetGallerySettingResponseModel } from '../../data-model/models/get-gallery-setting-response.model';

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
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl = '';
  error = new GalleryServiceError();

  constructor(
    private respAPIService: RestApiService,
    private httpClient: HttpClient,
    @Inject(CMS_ENVIROMENT_TOKEN) private environment: CmsEnviroment,
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

    const requestBody: GalleryCategoryPutRequest = {
      category_name: categoryName,
      assign_dept_id: assignDeptId,
      parent_id: parentId || '',
    };

    return this.respAPIService.CreateGalleryCategory({ requestBody }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('createGalleryCategory')),
    );
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
    return this.respAPIService.DeleteGalleryCategory({ categoryID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('deleteGalleryCategory')),
    );
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

    return this.respAPIService.GetGallery(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getGalleryByCategoryID')),
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
    return this.respAPIService.GetGalleryCategory({}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getGalleryCategory')),
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

    const requestBody: GalleryCategoryPutRequest = {
      category_name: categoryName,
      assign_dept_id: assignDeptId,
      parent_id: parentId || '',
    };

    return this.respAPIService.UpdateGalleryCategory({ categoryID, requestBody }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('putGalleryCategoryByCategoryID')),
    );
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
    const model = {
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
      url: '',
    };

    const reader = new FileReader();
    // 轉換成 DataURL
    reader.readAsDataURL(model.data);

    reader.onload = () => {
      // 將圖片 src 替換為 DataURL
      model.url = reader.result as string;
    };

    return model;
  }

  getGalleryConfig(): Observable<GalleryConfigResponseModel> {
    return this.respAPIService.GetGalleryConfig({}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getGalleryConfig')),
      ModelMapper.rxMapModelTo(GalleryConfigResponseModel),
    );
  }

  getSliderTypeRange(typeId: string): Observable<GetSliderTypeRangeResponseModel> {
    return this.respAPIService.GetSliderTypeRange({ typeId }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getSliderTypeRange')),
      ModelMapper.rxMapModelTo(GetSliderTypeRangeResponseModel),
    );
  }

  getGallerySetting(galleryID: string): Observable<GetGallerySettingResponseModel> {
    return this.respAPIService.GetGallerySetting({ galleryID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getGallerySetting')),
      ModelMapper.rxMapModelTo(GetGallerySettingResponseModel),
    );
  }

  private getDispatchOptionForMultipartFormData() {
    const header = new HttpHeaders().append('Content-Type', 'multipart/form-data');
    return { header };
  }

  addGallery(original: FileUploadModel, cropped: FileUploadModel, cropSetting): Observable<SaveGalleryResponseModel> {
    const formData = new FormData();
    formData.append('originalFile', original.data);
    formData.append('file', cropped.data);
    formData.append('setting', cropSetting ? JSON.stringify(cropSetting) : '');

    const params = {
      requestBody: formData
    };

    return this.respAPIService.AddGallery(params, this.getDispatchOptionForMultipartFormData()).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('addGallery')),
      ModelMapper.rxMapModelTo(SaveGalleryResponseModel),
    );
  }

  updateGallery2(galleryID: string, file: FileUploadModel, cropSetting): Observable<SaveGalleryResponseModel> {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('setting', cropSetting ? JSON.stringify(cropSetting) : '');

    const params = {
      galleryID,
      requestBody: formData
    };

    return this.respAPIService.UpdateGallery(params, this.getDispatchOptionForMultipartFormData()).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('updateGallery2')),
      ModelMapper.rxMapModelTo(SaveGalleryResponseModel),
    );
  }

  addFile(file: FileUploadModel): Observable<SaveFileResponseModel> {
    const formData = new FormData();
    formData.append('file', file.data);

    const params = {
      requestBody: formData
    };

    return this.respAPIService.AddFile(params, this.getDispatchOptionForMultipartFormData()).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('addFile')),
      ModelMapper.rxMapModelTo(SaveFileResponseModel),
    );
  }

  updateFile(galleryID: string, file: FileUploadModel): Observable<SaveFileResponseModel> {
    const formData = new FormData();
    formData.append('file', file.data);

    const params = {
      galleryID,
      requestBody: formData
    };

    return this.respAPIService.UpdateFile(params, this.getDispatchOptionForMultipartFormData()).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('updateFile')),
      ModelMapper.rxMapModelTo(SaveFileResponseModel),
    );
  }

}
