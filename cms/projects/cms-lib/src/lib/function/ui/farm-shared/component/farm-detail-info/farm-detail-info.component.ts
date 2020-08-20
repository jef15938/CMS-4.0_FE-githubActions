import { Component, OnInit, Input } from '@angular/core';
import { FarmFormInfoModel } from '../../../../../global/api/data-model/models/farm-form-info.model';

@Component({
  selector: 'cms-farm-detail-info',
  templateUrl: './farm-detail-info.component.html',
  styleUrls: ['./farm-detail-info.component.scss']
})
export class FarmDetailInfoComponent implements OnInit {

  @Input() funcID = '';
  @Input() detailInfo: FarmFormInfoModel;

  constructor() { }

  ngOnInit(): void { }

}
