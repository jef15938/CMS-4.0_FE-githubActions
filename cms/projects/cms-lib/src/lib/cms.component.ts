import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogFlowMessengerService } from './global/service';
import { RippleScreen } from './global/util/cfx';
import { AuthorizationService } from './global/api/service';
import { LoginInfo } from './global/api/neuxAPI/bean/LoginInfo';

@Component({
  selector: 'cms-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit, AfterViewInit {

  // @ViewChild('MenuContainer') menuContainer: ElementRef;

  cmsMenus = [];
  appMenus = [];

  loginInfo: LoginInfo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private dialogFlowMessengerService: DialogFlowMessengerService,
  ) { }

  ngOnInit(): void {
    const menus = this.activatedRoute.snapshot.data.menus;
    this.cmsMenus = menus.cmsMenus || [];
    this.appMenus = menus.appMenus || [];

    this.loginInfo = this.authorizationService.getCurrentLoginInfo();
  }

  ngAfterViewInit() {
    // const menuContainerEle = this.menuContainer.nativeElement;
    // const rippleFx = new RippleScreen(menuContainerEle);
  }

  logout() {
    this.authorizationService.logout().subscribe();
  }

}
