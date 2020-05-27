import { Component, OnInit, Input } from '@angular/core';
import { CmsFarmFormInfo, CmsFarmFormColumn } from 'projects/cms-lib/src/lib/type/farm.class';
import { CmsFarmFormColumnDisplayType } from 'projects/cms-lib/src/lib/type/farm.enum';

@Component({
  selector: 'cms-farm-form-info',
  templateUrl: './farm-form-info.component.html',
  styleUrls: ['./farm-form-info.component.scss']
})
export class FarmFormInfoComponent implements OnInit {

  CmsFarmFormColumnDisplayType = CmsFarmFormColumnDisplayType;

  @Input() farmInfo: CmsFarmFormInfo;

  rows: CmsFarmFormColumn[][];

  constructor() { }

  ngOnInit(): void {
    this.rows = this.createRows(this.farmInfo);
  }

  createRows(farmInfo: CmsFarmFormInfo): CmsFarmFormColumn[][] {
    const split_size = farmInfo.split_size;

    let rowCounts = farmInfo.columns.length / split_size;
    const floor = Math.floor(rowCounts);
    rowCounts = rowCounts > floor ? floor + 1 : rowCounts;

    const rows: CmsFarmFormColumn[][] = [];
    for (let i = 0, l = rowCounts; i < l; ++i) {
      const min = i * split_size;
      const max = min + split_size;
      const columnsInRow = farmInfo.columns.filter((_, index) => index >= min && index < max);
      rows.push(columnsInRow);
    }

    return rows;
  }

}
