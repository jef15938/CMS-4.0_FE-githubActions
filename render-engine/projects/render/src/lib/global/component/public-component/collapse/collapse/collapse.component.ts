import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
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

export type collapseAppearence = 'primary' | 'secondary';

@Component({
  selector: 'rdr-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapseComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit {

  @HostBinding('class') get style() { return `style--${this.styleType}`; }
  @Input() styleType: collapseAppearence = 'primary';
  @Input() collapseData: CollapseData;
  @Input() titleTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;

  /** nxCollapse 收合時，觸發此事件 */
  @Output() beforeCollapsing = new EventEmitter();
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
