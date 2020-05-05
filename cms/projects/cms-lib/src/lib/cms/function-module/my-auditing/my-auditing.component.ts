import { Component, OnInit } from '@angular/core';
import { AuditingService } from '../../../service/auditing.service';
import { Observable, concat } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MyAuditingInfo } from '../../../neuxAPI/bean/MyAuditingInfo';

import { MyAuditingActionCellComponent } from './component/cell-renderer/my-auditing-action-cell/my-auditing-action-cell.component';
import { ColDef } from '../../../ui/table/table.interface';

@Component({
  selector: 'cms-my-auditing',
  templateUrl: './my-auditing.component.html',
  styleUrls: ['./my-auditing.component.css']
})
export class MyAuditingComponent implements OnInit {

  myAuditings: MyAuditingInfo[];

  totalPageSize: number;
  totalRecSize: number;
  page: number = 1;

  colDefs: ColDef[] = [
    {
      colId: 'order_id',
      field: 'order_id',
      title: '序號',
    },
    {
      colId: 'order_name',
      field: 'order_name',
      title: '名稱',
    },
    {
      colId: 'status',
      field: 'status',
      title: '狀態',
    },
    {
      colId: 'start_time',
      field: 'start_time',
      title: '上架時間',
    },
    {
      colId: 'end_time',
      field: 'end_time',
      title: '下架時間',
    },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: MyAuditingActionCellComponent,
    }
  ];

  constructor(
    private _auditingService: AuditingService,
  ) { }

  ngOnInit(): void {
    this._init().subscribe();
  }

  private _init(): Observable<any> {
    return concat(
      this._getMyAuditings(),
    )
  }

  private _getMyAuditings(): Observable<MyAuditingInfo[]> {
    return this._auditingService.getMyAuditingList(this.page).pipe(
      tap(res => {
        this.totalPageSize = res.pageInfo.totalPageSize;
        this.totalRecSize = res.pageInfo.totalRecSize;
        this.myAuditings = res.datas;
        console.warn('this.myAuditings = ', this.myAuditings);
      }),
      map(res => res.datas)
    );
  }

}
