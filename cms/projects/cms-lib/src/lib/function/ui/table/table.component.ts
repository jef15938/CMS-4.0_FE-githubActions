import {
  Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef,
  ViewChildren, QueryList, AfterViewInit, Output, EventEmitter, ComponentRef
} from '@angular/core';
import { ColDef, CmsTableCustomCellEvent, CustomCellRenderer } from './table.interface';
import { DynamicWrapperDirective } from '@neux/core';

@Component({
  selector: 'cms-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TData> implements OnInit, AfterViewInit, OnChanges {

  @ViewChildren(DynamicWrapperDirective) customRenderWrappers: QueryList<DynamicWrapperDirective<CustomCellRenderer>>;

  @Input() colDefs: ColDef[];
  @Input() dataSource: TData[];

  @Output() customEvent = new EventEmitter<CmsTableCustomCellEvent>();
  @Output() rowClick = new EventEmitter<TData>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.colDefs || changes.dataSource) {
      // this.render();
    }
  }

  private render() {
    // if (!this.customRenderWrappers) { return; }
    // this.changeDetectorRef.detectChanges();
    // this.customRenderWrappers.forEach(wrapper => wrapper.render());
    // this.changeDetectorRef.detectChanges();
  }

  getDisplayedColumns() {
    return this.colDefs ? this.colDefs.map(c => c.colId) : [];
  }

  triggerCustomEvent(event: CmsTableCustomCellEvent) {
    this.customEvent.next(event);
  }

  onCellComponentLoad = (data) => {
    return (componentRef: ComponentRef<CustomCellRenderer>) => {
      const instance = componentRef.instance;
      if (instance?.compInit) {
        instance.compInit({
          table: this,
          data,
        });
      }
    };
  }

  onRowClick(row: TData) {
    this.rowClick.emit(row);
  }

}
