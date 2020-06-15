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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.menus = this.route.snapshot.data['menus'];
  }

}
