import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  depts = [];

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.depts = this._route.snapshot.data['depts'];
  }

}
