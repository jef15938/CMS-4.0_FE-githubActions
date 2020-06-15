import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChildren, QueryList, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
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

  @Output() customEvent = new EventEmitter<{ $event: any, data: TData }>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.colDefs || changes.dataSource) {
      this.render();
    }
  }

  private render() {
    if (!this.customRenderWrappers) { return; }
    this.changeDetectorRef.detectChanges();
    this.customRenderWrappers.forEach(wrapper => wrapper.render());
    this.changeDetectorRef.detectChanges();
  }

  getDisplayedColumns() {
    return this.colDefs ? this.colDefs.map(c => c.colId) : [];
  }

  triggerCustomEvent(event) {
    this.customEvent.next(event);
  }

}
