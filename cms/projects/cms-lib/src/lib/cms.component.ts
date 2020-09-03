import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogFlowMessengerService } from './global/service';
import { RippleScreen } from './global/util/cfx';
import { AuthorizationService } from './global/api/service';
import { MenuInfoModel } from './global/api/data-model/models/menu-info.model';
import { LoginInfoModel } from './global/api/data-model/models/login-info.model';

@Component({
  selector: 'cms-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit, AfterViewInit {

  // @ViewChild('MenuContainer') menuContainer: ElementRef;

  menus: MenuInfoModel[] = [];

  loginInfo: LoginInfoModel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private dialogFlowMessengerService: DialogFlowMessengerService,
  ) { }

  ngOnInit(): void {
    const menus = this.activatedRoute.snapshot.data.menus;
    this.menus = menus || [];

    this.loginInfo = this.authorizationService.getCurrentLoginInfo();
  }

  ngAfterViewInit() {
    // const menuContainerEle = this.menuContainer.nativeElement;
    // const rippleFx = new RippleScreen(menuContainerEle);
    const currentUrl = this.router.url;
    if (!currentUrl || currentUrl === '/') {
      const firstMenuPath = this.getFirstMenuPath(this.menus);
      if (firstMenuPath) {
        this.router.navigateByUrl(firstMenuPath);
      }
    }
  }

  logout() {
    this.authorizationService.logout().subscribe();
  }

  getFirstMenuPath(menus: MenuInfoModel[], path = ''): string {
    if (!menus?.length) { return path; }
    const first = menus[0];
    path += `/${first.funcId}`;
    return this.getFirstMenuPath(first.children, path);
  }

}
