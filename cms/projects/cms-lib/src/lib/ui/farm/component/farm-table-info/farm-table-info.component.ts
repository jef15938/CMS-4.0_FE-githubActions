import { Component, OnInit, Input } from '@angular/core';
import { CmsFarmTableInfo } from 'projects/cms-lib/src/lib/type/farm.class';

@Component({
  selector: 'cms-farm-table-info',
  templateUrl: './farm-table-info.component.html',
  styleUrls: ['./farm-table-info.component.scss']
})
export class FarmTableInfoComponent implements OnInit {

  @Input() tableInfo: CmsFarmTableInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
