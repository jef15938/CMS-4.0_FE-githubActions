import { Component, OnInit, Input } from '@angular/core';
import { CmsFarmFormInfo, CmsFarmFormColumn } from 'projects/cms-lib/src/lib/type/farm.class';
import { CmsFarmFormColumnDisplayType } from 'projects/cms-lib/src/lib/type/farm.enum';
import { FarmFormComp } from '../../farm.interface';

@Component({
  selector: 'cms-farm-form-info',
  templateUrl: './farm-form-info.component.html',
  styleUrls: ['./farm-form-info.component.scss']
})
export class FarmFormInfoComponent implements FarmFormComp, OnInit {

  CmsFarmFormColumnDisplayType = CmsFarmFormColumnDisplayType;

  @Input() farmFormInfo: CmsFarmFormInfo;

  rows: CmsFarmFormColumn[][];

  constructor() { }

  ngOnInit(): void {
    this.rows = this.createRows(this.farmFormInfo);
  }

  createRows(farmFormInfo: CmsFarmFormInfo): CmsFarmFormColumn[][] {
    const split_size = farmFormInfo.split_size;

    let rowCounts = farmFormInfo.columns.length / split_size;
    const floor = Math.floor(rowCounts);
    rowCounts = rowCounts > floor ? floor + 1 : rowCounts;

    const rows: CmsFarmFormColumn[][] = [];
    for (let i = 0, l = rowCounts; i < l; ++i) {
      const min = i * split_size;
      const max = min + split_size;
      const columnsInRow = farmFormInfo.columns.filter((_, index) => index >= min && index < max);
      rows.push(columnsInRow);
    }

    return rows;
  }

  getFarmInfo() {
    return JSON.parse(JSON.stringify(this.farmFormInfo));
  }

}
