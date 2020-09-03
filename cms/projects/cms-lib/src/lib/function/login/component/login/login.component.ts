import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from '../../../../global/api/service';
import { CMS_ENVIROMENT_TOKEN } from '../../../../global/injection-token';
import { CmsEnviroment } from '../../../../global/interface';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Cms } from '../../../../global/service';

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validImageVersion = new Date().getTime();

  @ViewChild('validImage') validImage: ElementRef;

  username = '';
  password = '';
  validationCode: number = null;

  constructor(
    private cms: Cms,
    private authorizationService: AuthorizationService,
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authorizationService.login(this.username, this.password, this.validationCode).pipe(
      concatMap(_ => this.authorizationService.getLoginInfo()),
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        showMessage();
        this.validationCode = null;
        this.refreshValidImageVersion();
      }),
      tap(_ => {
        this.cms.setAuthorized(true);
        this.router.navigate(['']);
      }),
    ).subscribe();
  }

  refreshValidImageVersion() {
    this.validImageVersion = new Date().getTime();
  }
}
