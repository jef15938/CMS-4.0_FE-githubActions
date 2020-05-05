import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CellRendererWrapperDirective } from './cell-renderer-wrapper.directive';
import { ColDef } from './table.interface';

@Component({
  selector: 'cms-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TData> implements OnInit, AfterViewInit, OnChanges {

  @ViewChildren(CellRendererWrapperDirective) customRenderWrappers: QueryList<CellRendererWrapperDirective>;

  @Input() colDefs: ColDef[];
  @Input() dataSource: TData[];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.colDefs || changes.dataSource) {
      this._render();
    }
  }

  private _render() {
    if (!this.customRenderWrappers) { return; }
    this._changeDetectorRef.detectChanges();
    this.customRenderWrappers.forEach(wrapper => wrapper.render());
    this._changeDetectorRef.detectChanges();
  }

  getDisplayedColumns() {
    return this.colDefs ? this.colDefs.map(c => c.colId) : [];
  }

}
