import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rdr-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  error: any;

  constructor(
    private router: Router
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    console.warn('ErrorPageComponent currentNavigation = ', currentNavigation);
    const error = currentNavigation?.extras?.state?.error;
    this.error = error;
    console.warn('ErrorPageComponent error = ', error);
  }

  ngOnInit(): void {
  }

}
