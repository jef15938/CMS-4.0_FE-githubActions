import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../../global/api/service';

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = 'admin';
  password = 'admin1234';
  validationCode = 1;

  constructor(
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authorizationService.login(this.username, this.password, this.validationCode).subscribe();
  }

}
