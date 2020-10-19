import {
  Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList,
  Output, EventEmitter, AfterViewChecked, Injector, Inject, Optional
} from '@angular/core';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { LayoutWrapperSelectEvent } from '../layout-wrapper/layout-wrapper.interface';
import { LayoutWrapperBase } from '../layout-wrapper/layout-wrapper-base';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { RenderedPageEnvironment } from '../../../global/interface/page-environment.interface';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../../../global/injection-token/injection-token';

const RENDERED_PAGE_ENVIRONMENT: RenderedPageEnvironment = {
  pageSites: [],
  pageNode: null,
  pageLang: '',
  isBrowser: true,
  isRuntime: false,
};

export class RenderedPageEnvironmentInstance implements RenderedPageEnvironment {
  get pageSites() { return RENDERED_PAGE_ENVIRONMENT.pageSites; }
  get pageNode() { return RENDERED_PAGE_ENVIRONMENT.pageNode; }
  get pageLang() { return RENDERED_PAGE_ENVIRONMENT.pageLang; }
  get isBrowser() { return RENDERED_PAGE_ENVIRONMENT.isBrowser; }
  get isRuntime() { return RENDERED_PAGE_ENVIRONMENT.isRuntime; }
}

@Component({
  selector: 'rdr-templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.scss'],
  providers: [
    { provide: RENDERED_PAGE_ENVIRONMENT_ROKEN, useClass: RenderedPageEnvironmentInstance }
  ]
})
export class TemplatesContainerComponent extends LayoutWrapperBase implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() templates: ContentTemplateInfoModel[];

  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();
  @Output() enter = new EventEmitter<HTMLElement>();
  @Output() leave = new EventEmitter<HTMLElement>();

  @ViewChildren(LayoutWrapperComponent) layoutWrapperComponents: QueryList<LayoutWrapperComponent>;

  constructor(
    injector: Injector,
    @Inject('RENDER_ENGINE_RENDERED_PAGE_ENVIRONMENT') @Optional() private pageEnv: RenderedPageEnvironment,
  ) {
    super(injector);
    if (pageEnv) {
      RENDERED_PAGE_ENVIRONMENT.isBrowser = pageEnv.isBrowser;
      RENDERED_PAGE_ENVIRONMENT.isRuntime = pageEnv.isRuntime;
      RENDERED_PAGE_ENVIRONMENT.pageLang = pageEnv.pageLang;
      RENDERED_PAGE_ENVIRONMENT.pageNode = pageEnv.pageNode;
      RENDERED_PAGE_ENVIRONMENT.pageSites = pageEnv.pageSites;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (this.layoutWrapperComponents) {
      this.layoutWrapperComponents.forEach(lw => lw.parentTemplatesContainer = this);
    }
    this.changeDetectorRef.detectChanges();
  }

  mouseenter() {
    // container不用輸出enter/leave
  }

  mouseleave() {
    // container不用輸出enter/leave
  }

}
