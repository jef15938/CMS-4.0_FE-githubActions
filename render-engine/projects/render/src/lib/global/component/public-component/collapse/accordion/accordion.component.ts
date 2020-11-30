import {
  AfterViewInit,
  ContentChild,
  QueryList,
  TemplateRef,
  ViewChildren,
  Component,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CustomizeBaseDirective } from '../../base-component';
import { CollapseData } from '../collapse.interface';
import { CollapseComponent } from '../collapse/collapse.component';

@Component({
  selector: 'rdr-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit {

  @Input() collapseList: Array<CollapseData>;

  /** 是否需要項目符號 */
  @Input() hasList = false;

  @Input() titleTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @ViewChildren(CollapseComponent) collapseComponentList: QueryList<CollapseComponent>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.collapseComponentList.toArray().forEach((item, index) => {
      item.beforeCollapsing.subscribe(() => {
        this.closeOthersAndOpenCollapse(index);
      });
    });
  }


  /**
   * 關掉其他收合，並打開當下點擊的收合
   *
   * @param {number} index
   */
  closeOthersAndOpenCollapse(index: number) {
    this.collapseComponentList.toArray().forEach((item, currentIndex) => {
      if (index !== currentIndex && item.nxCollapse.isCollapse) {
        item.nxCollapse.statusCollapse = 'collapsing';
        item.nxCollapse.animateCollapse(false).pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          item.nxCollapse.isCollapse = false;
        });
      }
    });
  }

}
