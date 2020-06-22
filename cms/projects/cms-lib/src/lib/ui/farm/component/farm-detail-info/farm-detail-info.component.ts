import { Component, OnInit, Input } from '@angular/core';
import { CmsFarmFormInfo } from '@cms-lib/type';

@Component({
  selector: 'cms-farm-detail-info',
  templateUrl: './farm-detail-info.component.html',
  styleUrls: ['./farm-detail-info.component.scss']
})
export class FarmDetailInfoComponent implements OnInit {

  @Input() detailInfo: CmsFarmFormInfo;

  constructor() { }

  ngOnInit(): void { }

}
