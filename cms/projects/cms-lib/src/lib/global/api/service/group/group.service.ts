import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GroupMenuGetResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse } from '../../neuxAPI/bean/GroupSiteMapGetResponse';
import { GroupMenuInfo } from '../../neuxAPI/bean/GroupMenuInfo';
import { GroupSitemapInfo } from '../../neuxAPI/bean/GroupSitemapInfo';

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
   * @param {string} groupID
   * @returns
   * @memberof GroupService
   */
  getGroupMenuList(groupID: string): Observable<GroupMenuInfo[]> {
    if (!groupID) {
      throw new ParamsError('groupID', 'getGroupMenuList', 'string', groupID);
    }

    return this.restAPIService.dispatchRestApi<GroupMenuGetResponse>('GetGroupMenuByGroupID', { groupID })
      .pipe(map(res => res.datas));
  }

  /**
   *
   *
   * @param {string} groupID
   * @returns
   * @memberof GroupService
   */
  getGroupSiteMapList(groupID: string): Observable<GroupSitemapInfo[]> {
    if (!groupID) {
      throw new ParamsError('groupID', 'getGroupSiteMapList', 'string', groupID);
    }

    return this.restAPIService.dispatchRestApi<GroupSiteMapGetResponse>('GetGroupSiteMapByGroupID', { groupID })
      .pipe(map(res => res.datas));
  }

  /**
   *
   *
   * @param {string} groupID
   * @returns
   * @memberof DepartmentService
   */
  updateGroupMenu(groupID: string, menuInfos: GroupMenuInfo[]) {
    if (!groupID) {
      throw new ParamsError('groupID', 'updateGroupMenu', 'string', groupID);
    }
    if (!menuInfos) {
      throw new ParamsError('menuInfos', 'updateGroupMenu', 'GroupMenuInfo[]', menuInfos);
    }

    const requestBody: { [k: string]: any } = {
      datas: menuInfos
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
   * @param {string} groupID
   * @returns
   * @memberof DepartmentService
   */
  updateGroupSitemap(groupID: string, sitemapInfos: GroupMenuInfo[]) {
    if (!groupID) {
      throw new ParamsError('groupID', 'updateGroupSitemap', 'string', groupID);
    }
    if (!sitemapInfos) {
      throw new ParamsError('sitemapInfos', 'updateGroupSitemap', 'GroupMenuInfo[]', sitemapInfos);
    }

    const requestBody: { [k: string]: any } = {
      datas: sitemapInfos
    };

    const params: { [k: string]: any } = {
      groupID,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PutGroupSiteMapByGroupID', params);
  }
}
