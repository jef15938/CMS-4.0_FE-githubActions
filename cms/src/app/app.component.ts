import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

declare let gtag: Function;
@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cms';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private router: Router
  ) {
    this.matIconRegistry.registerFontClassAlias('fontawasome', 'fa');
  }


  ngOnInit(): void {
    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      distinctUntilChanged((previous: any, current: any) => previous.url === current.url)
    ).subscribe((x: NavigationEnd) => {
      gtag('config', 'UA-151867463-1', { page_path: x.urlAfterRedirects });
    });

  }


}
