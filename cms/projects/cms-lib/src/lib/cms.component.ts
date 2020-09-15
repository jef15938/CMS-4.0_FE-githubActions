import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogFlowMessengerService, CmsLoadingToggle } from './global/service';
import { RippleScreen } from './global/util/cfx';
import { AuthorizationService } from './global/api/service';
import { MenuInfoModel } from './global/api/data-model/models/menu-info.model';
import { LoginInfoModel } from './global/api/data-model/models/login-info.model';
import { Cms } from './global/service/cms.service';
import { Subject, of } from 'rxjs';
import { takeUntil, catchError, tap } from 'rxjs/operators';
import { ModalService } from './function/ui';

@Component({
  selector: 'cms-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit, AfterViewInit, OnDestroy {

  // @ViewChild('MenuContainer') menuContainer: ElementRef;

  menus: MenuInfoModel[] = [];

  loginInfo: LoginInfoModel;

  private destroy$ = new Subject();

  constructor(
    private cms: Cms,
    public cmsLoadingToggle: CmsLoadingToggle,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private dialogFlowMessengerService: DialogFlowMessengerService,
    private modalService: ModalService,
  ) { }


  ngOnInit(): void {
    const menus = this.activatedRoute.snapshot.data.menus;
    this.menus = menus || [];
    this.loginInfo = this.authorizationService.getCurrentLoginInfo();
    this.cms.onAuthorizationChange().pipe(takeUntil(this.destroy$)).subscribe(authorized => {
      if (!authorized.authorized) {
        this.logout(authorized.reason);
      }
    });
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  logout(reason: string) {
    this.authorizationService.logout().pipe(
      catchError(error => of(undefined)),
      tap(_ => {
        localStorage.clear();
        this.modalService.closeAll();
        if (reason) {
          this.modalService.openMessage({ message: reason }).subscribe();
        }
        this.router.navigate(['login']);
      })
    ).subscribe();
  }

  getFirstMenuPath(menus: MenuInfoModel[], path = ''): string {
    if (!menus?.length) { return path; }
    const first = menus[0];
    path += `/${first.funcId}`;
    return this.getFirstMenuPath(first.children, path);
  }

}
