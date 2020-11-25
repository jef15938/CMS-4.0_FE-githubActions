import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Input,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { SitemapNode } from '@neux/ui/lib/util/model/mega-menu.model';
import { NxMegaMenuComponent } from '@neux/ui';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'rdr-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit {

  @ViewChild(NxMegaMenuComponent) megaMenu: NxMegaMenuComponent;
  @Input() menu: SitemapNode[];
  @Input() customDropdownTemplate: TemplateRef<any>;

  @Output() statusChange: EventEmitter<boolean> = new EventEmitter();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.megaMenu.onStatusChange().pipe(
      tap(status => this.statusChange.emit(status)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  toggleMobileMenu() {
    this.megaMenu.toggleMobileMenu();
  }
}
