import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { GTagService, customActionEvent } from '@neux/render';
import { customActions } from './global/common/custom-action';

@Component({
  selector: 'rdr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'render-engine';
  customAction = customActionEvent
  constructor(
    private router: Router,
    private gTagService: GTagService,
  ) { }

  ngOnInit() {
    this.gTagService.gtag('event', 'page_view', { page_path: this.router.url });
    this.router.events
      .pipe(distinctUntilChanged((previous: any, current: any) => {
        if (current instanceof NavigationEnd) {
          return previous.url === current.url;
        }
        return true;
      }))
      .subscribe((x: any) => { this.gTagService.gtag('event', 'page_view', { page_path: x.url }); });
    this.customAction.subscribe(e => {
      let action = customActions.datas.find(data => data.actionID === e);
      if (action) { action.fn(); }
      else { throw new Error("action not found"); }
    });
  }
}
