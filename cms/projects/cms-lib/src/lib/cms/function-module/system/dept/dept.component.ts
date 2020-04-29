import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeptNodeComponent } from './component/dept-node/dept-node.component';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';

@Component({
  selector: 'cms-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  customNodeRenderer = DeptNodeComponent;

  depts: DepartmentInfo[] = [];

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.depts = this._route.snapshot.data['depts'];
  }

  onNodeClicked(data: DepartmentInfo) {
    console.warn('DeptComponent onNodeClicked() data = ', data);
  }

  onCustomEvent(event) {
    console.warn('DeptComponent onCustomEvent() event = ', event);
  }

}
