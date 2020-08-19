import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse } from '../../neuxAPI/bean/GroupSiteMapGetResponse';
import { GroupMenuInfo } from '../../neuxAPI/bean/GroupMenuInfo';
import { GroupSitemapInfo } from '../../neuxAPI/bean/GroupSitemapInfo';
import { GroupInfo } from '../../neuxAPI/bean/GroupInfo';
import { ListGroupResponst } from '../../neuxAPI/bean/ListGroupResponst';
import { rxMapTo, mapTo } from '../../data-model/mapper';
import { GroupMenuInfoModel } from '../../data-model/models/group-menu-info.model';
import { GroupMenuGetResponseModel } from '../../data-model/models/group-menu-get-response.model';

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
  getGroupList(): Observable<GroupInfo[]> {
    return this.restAPIService.dispatchRestApi<ListGroupResponst>('GetGroup', {})
      .pipe(map(res => res.datas));
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
      rxMapTo(GroupMenuGetResponseModel),
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
      datas: menuInfoModels.map(menuInfoModel => mapTo(GroupMenuInfo, menuInfoModel))
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
  getGroupSiteMapList(siteID: string, groupID: string): Observable<GroupSitemapInfo[]> {
    if (!siteID) { throw new ParamsError('siteID', 'getGroupSiteMapList', 'string', siteID); }
    if (!groupID) { throw new ParamsError('groupID', 'getGroupSiteMapList', 'string', groupID); }

    return this.restAPIService.dispatchRestApi<GroupSiteMapGetResponse>('GetGroupSiteMapBySiteIDAndGroupID', { siteID, groupID })
      .pipe(map(res => res.datas));
  }

  /**
   *
   *
   * @param {string} siteID
   * @param {string} groupID
   * @returns
   * @memberof DepartmentService
   */
  updateGroupSitemap(siteID: string, groupID: string, sitemapInfos: GroupSitemapInfo[]) {
    if (!siteID) { throw new ParamsError('siteID', 'updateGroupSitemap', 'string', siteID); }
    if (!groupID) { throw new ParamsError('groupID', 'updateGroupSitemap', 'string', groupID); }
    if (!sitemapInfos) { throw new ParamsError('sitemapInfos', 'updateGroupSitemap', 'GroupMenuInfo[]', sitemapInfos); }

    const requestBody: { [k: string]: any } = {
      datas: sitemapInfos
    };

    const params: { [k: string]: any } = {
      siteID,
      groupID,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PutGroupSiteMapBySiteIDAndGroupID', params);
  }
}
