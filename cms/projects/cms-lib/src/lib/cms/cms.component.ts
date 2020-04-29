import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  menus = [];

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.menus = this._route.snapshot.data['menus'];
  }

}
