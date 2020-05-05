import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer } from 'projects/cms-lib/src/lib/ui/table/table.interface';
import { MyAuditingInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/MyAuditingInfo';

@Component({
  selector: 'cms-my-auditing-action-cell',
  templateUrl: './my-auditing-action-cell.component.html',
  styleUrls: ['./my-auditing-action-cell.component.css']
})
export class MyAuditingActionCellComponent implements CustomCellRenderer, OnInit {

  config: { data: MyAuditingInfo }

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: any; }) {
    this.config = config;
  };

}
