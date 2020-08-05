import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { GroupMenuGetResponse as MenuResponse } from '../../neuxAPI/bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse as SitemapResponse } from '../../neuxAPI/bean/GroupSiteMapGetResponse';

export class GroupMenuInfo {
  func_id: string;
}

export class GroupMenuGetResponse extends MenuResponse {
  datas: GroupMenuInfo[];
}



export class GroupSitemapInfo {
  node_id: string;
  can_add: boolean;
  can_modify: boolean;
  can_delete: boolean;
}

export class GroupSitemapGetResponse extends SitemapResponse {
  datas: GroupSitemapInfo[];
}


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

    return this.restAPIService.dispatchRestApi<GroupSitemapGetResponse>('GetGroupSiteMapByGroupID', { groupID })
      .pipe(map(res => res.datas));
  }
}
