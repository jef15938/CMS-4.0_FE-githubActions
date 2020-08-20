import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse } from '../../neuxAPI/bean/GroupSiteMapGetResponse';
import { GroupSitemapInfo } from '../../neuxAPI/bean/GroupSitemapInfo';
import { ListGroupResponst } from '../../neuxAPI/bean/ListGroupResponst';
import { ModelMapper } from '../../data-model/model-mapper';
import { GroupMenuInfoModel } from '../../data-model/models/group-menu-info.model';
import { GroupMenuGetResponseModel } from '../../data-model/models/group-menu-get-response.model';
import { ListGroupResponseModel } from '../../data-model/models/list-group-response.model';
import { GroupInfoModel } from '../../data-model/models/group-info.model';
import { GroupSitemapInfoModel } from '../../data-model/models/group-sitemap-info.model';
import { GroupSiteMapGetResponseModel } from '../../data-model/models/group-sitemap-get-response';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

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
    return this.restAPIService.dispatchRestApi<ListGroupResponst>('GetGroup', {}).pipe(
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

    return this.restAPIService.dispatchRestApi<GroupMenuGetResponse>('GetGroupMenuByGroupID', { groupID }).pipe(
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

    const requestBody: { [k: string]: any } = {
      datas: ModelMapper.mapArrayTo(GroupMenuInfoModel, menuInfoModels)
    };

    const params: { [k: string]: any } = {
      groupID,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PutGroupMenuByGroupID', params);
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

    return this.restAPIService.dispatchRestApi<GroupSiteMapGetResponse>('GetGroupSiteMapBySiteIDAndGroupID', { siteID, groupID }).pipe(
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

    const requestBody: { [k: string]: any } = {
      datas: ModelMapper.mapArrayTo(GroupSitemapInfo, sitemapInfos)
    };

    const params: { [k: string]: any } = {
      siteID,
      groupID,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PutGroupSiteMapBySiteIDAndGroupID', params);
  }
}
