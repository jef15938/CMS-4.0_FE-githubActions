import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from '../../../../global/api/service';
import { CMS_ENVIROMENT_TOKEN } from '../../../../global/injection-token';
import { CmsEnviroment } from '../../../../global/interface';

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validImageVersion = 0;

  @ViewChild('validImage') validImage: ElementRef;

  username = '';
  password = '';
  validationCode;

  constructor(
    private authorizationService: AuthorizationService,
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authorizationService.login(this.username, this.password, this.validationCode).subscribe();
  }

  refreshValidImageVersion() {
    this.validImageVersion++;
  }
}
