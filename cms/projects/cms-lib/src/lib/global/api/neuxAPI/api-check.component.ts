import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiFactory } from '@neux/core';

@Component({
  selector: 'app-api-check',
  template: `<p>Select API:</p><select (change)="onApiChange($event)">
  <option>Select...</option>
  <option *ngFor="let apiName of apiList" [value]="apiName">{{apiName}}</option>
</select>
<p>Params</p>
<div><textarea [(ngModel)]="params"></textarea></div>
<button (click)="send()">Send</button>
<ng-container *ngIf="api$ | async as data; else loadingOrError">
  <code>{{data}}</code>
</ng-container>
<ng-template #loadingOrError>
    <pre>{{errorObject}}</pre>
</ng-template>`,
  styles: ['textarea { width:90vw;height:20vh; }']
})
export class ApiCheckComponent implements OnInit {

  public api$: Observable<any>;
  public apiList: Array<string> = [];
  public errorObject: any;
  public currentSelectAPI;
  public params = '{}';

  constructor(
    private restApiService: RestApiService,
    private apiFactory: ApiFactory
  ) { }

  ngOnInit() {

    this.apiList = this.apiFactory.getApiList();
  }

  onApiChange(e) {
    let apiName = e.target.value;
    this.currentSelectAPI = apiName;
  }

  send() {
    this.api$ = this.restApiService.dispatchRestApi(this.currentSelectAPI, JSON.parse(this.params)).pipe(
      map(x => JSON.stringify(x.body)),
      catchError(err => {
        this.errorObject = `Error:${err}`;
        return throwError(err);
      }));
  }

}