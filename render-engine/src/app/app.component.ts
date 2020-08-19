import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { GTagService } from './global/service/gtag.service';

@Component({
  selector: 'rdr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'render-engine';

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
  }
}
