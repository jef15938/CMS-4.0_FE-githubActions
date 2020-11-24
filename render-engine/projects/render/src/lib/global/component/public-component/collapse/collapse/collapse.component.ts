import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';
import { CollapseData } from '../collapse.interface';
import { NxCollapseComponent } from '@neux/ui';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'rdr-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapseComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit {

  @Input() collapseData: CollapseData;

  /** nxCollapse 收合時，觸發此事件 */
  @Output() beforeCollapsing = new EventEmitter();

  @ContentChild('title') titleTemplateRef: TemplateRef<any>;
  @ContentChild('content') contentTemplateRef: TemplateRef<any>;
  @ViewChild(NxCollapseComponent) nxCollapse: NxCollapseComponent;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.nxCollapse.beforeClick.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.beforeCollapsing.emit();
    });
  }

}
