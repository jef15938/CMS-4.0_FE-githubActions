import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse } from '../../neuxAPI/bean/GroupSiteMapGetResponse';
import { GroupSitemapInfo } from '../../neuxAPI/bean/GroupSitemapInfo';
import { GroupMenuInfoModel } from '../../data-model/models/group-menu-info.model';
import { GroupMenuGetResponseModel } from '../../data-model/models/group-menu-get-response.model';
import { ListGroupResponseModel } from '../../data-model/models/list-group-response.model';
import { GroupInfoModel } from '../../data-model/models/group-info.model';
import { GroupSitemapInfoModel } from '../../data-model/models/group-sitemap-info.model';
import { GroupSiteMapGetResponseModel } from '../../data-model/models/group-sitemap-get-response.model';
import { GroupMenuInfo } from '../../neuxAPI/bean/GroupMenuInfo';
import { GroupServiceError, CmsErrorHandler } from '../../../error-handling';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  error = new GroupServiceError();

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @returns
   * @memberof GroupService
   */
  getGroupList(): Observable<GroupInfoModel[]> {
    return this.restAPIService.GetGroup({}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getGroupList')),
      ModelMapper.rxMapModelTo(ListGroupResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} groupID
   * @returns
   * @memberof GroupService
   */
  getGroupMenuList(groupID: string): Observable<GroupMenuInfoModel[]> {
    if (!groupID) {
      throw new ParamsError('groupID', 'getGroupMenuList', 'string', groupID);
    }

    return this.restAPIService.GetGroupMenuByGroupID({ groupID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getGroupMenuList')),
      ModelMapper.rxMapModelTo(GroupMenuGetResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} groupID
   * @returns
   * @memberof DepartmentService
   */
  updateGroupMenu(groupID: string, menuInfoModels: GroupMenuInfoModel[]) {
    if (!groupID) {
      throw new ParamsError('groupID', 'updateGroupMenu', 'string', groupID);
    }
    if (!menuInfoModels) {
      throw new ParamsError('menuInfoModels', 'updateGroupMenu', 'GroupMenuInfo[]', menuInfoModels);
    }

    const requestBody: GroupMenuGetResponse = {
      datas: ModelMapper.mapArrayTo(GroupMenuInfo, menuInfoModels)
    };

    const params = {
      groupID,
      requestBody,
    };

    return this.restAPIService.PutGroupMenuByGroupID(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('updateGroupMenu')),
    );
  }

  /**
   *
   *
   * @param {string} siteID
   * @param {string} groupID
   * @returns
   * @memberof GroupService
   */
  getGroupSiteMapList(siteID: string, groupID: string): Observable<GroupSitemapInfoModel[]> {
    if (!siteID) { throw new ParamsError('siteID', 'getGroupSiteMapList', 'string', siteID); }
    if (!groupID) { throw new ParamsError('groupID', 'getGroupSiteMapList', 'string', groupID); }

    return this.restAPIService.GetGroupSiteMapBySiteIDAndGroupID({ siteID, groupID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getGroupSiteMapList')),
      ModelMapper.rxMapModelTo(GroupSiteMapGetResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} siteID
   * @param {string} groupID
   * @returns
   * @memberof DepartmentService
   */
  updateGroupSitemap(siteID: string, groupID: string, sitemapInfos: GroupSitemapInfoModel[]) {
    if (!siteID) { throw new ParamsError('siteID', 'updateGroupSitemap', 'string', siteID); }
    if (!groupID) { throw new ParamsError('groupID', 'updateGroupSitemap', 'string', groupID); }
    if (!sitemapInfos) { throw new ParamsError('sitemapInfos', 'updateGroupSitemap', 'GroupMenuInfo[]', sitemapInfos); }

    const requestBody: GroupSiteMapGetResponse = {
      datas: ModelMapper.mapArrayTo(GroupSitemapInfo, sitemapInfos)
    };

    const params = {
      siteID,
      groupID,
      requestBody,
    };

    return this.restAPIService.PutGroupSiteMapBySiteIDAndGroupID(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('updateGroupSitemap')),
    );
  }
}
