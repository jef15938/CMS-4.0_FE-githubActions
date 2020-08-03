import { Component, OnInit, Input } from '@angular/core';
import { CmsFarmFormInfo } from './../../../../../global/model';

@Component({
  selector: 'cms-farm-detail-info',
  templateUrl: './farm-detail-info.component.html',
  styleUrls: ['./farm-detail-info.component.scss']
})
export class FarmDetailInfoComponent implements OnInit {

  @Input() funcID = '';
  @Input() detailInfo: CmsFarmFormInfo;

  constructor() { }

  ngOnInit(): void { }

}
