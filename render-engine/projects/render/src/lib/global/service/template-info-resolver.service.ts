import { Injectable } from '@angular/core';
import { RenderService } from './render.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { PageInfo } from '../interface/page-info.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateInfoResolverService implements Resolve<PageInfo>{

  constructor(
    private renderService: RenderService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PageInfo> {
    const pageID = route.params.pageID;
    return this.renderService.getContentInfo(pageID);
  }


}
