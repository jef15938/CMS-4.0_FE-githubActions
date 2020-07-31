import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from '../../../../global/api/service';
import { CMS_ENVIROMENT_TOKEN } from '../../../../global/injection-token';
import { CmsEnviroment } from '../../../../global/interface';
import { ModalService } from '../../../ui/modal';
import { catchError } from 'rxjs/operators';
import { NEVER } from 'rxjs';

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
    private authorizationService: AuthorizationService,
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authorizationService.login(this.username, this.password, this.validationCode).pipe(
      catchError(err => {
        this.validationCode = null;
        this.refreshValidImageVersion();
        return NEVER;
      })
    ).subscribe();
  }

  refreshValidImageVersion() {
    this.validImageVersion = new Date().getTime();
  }
}
