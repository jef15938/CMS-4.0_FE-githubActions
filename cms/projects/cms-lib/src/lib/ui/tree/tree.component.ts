import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ComponentFactoryResolver, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNodeCustomWrapperDirective } from './tree-node-custom-wrapper.directive';
import { CmsTreeNodeRenderer, CmsTree } from './tree.interface';

@Component({
  selector: 'cms-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent<TData> implements CmsTree<TData>, OnInit, AfterViewInit, OnChanges {

  @ViewChildren(TreeNodeCustomWrapperDirective) customRenderWrappers: QueryList<TreeNodeCustomWrapperDirective<TData>>;

  treeControl: NestedTreeControl<TData>;
  dataSource: MatTreeNestedDataSource<TData>;

  @Input() context: any;

  @Input() nodeDisplayField = 'name';
  @Input() nodeChildrenEntryField = 'children';
  @Input() nodeDatas: TData[] = [];

  @Input() customNodeRenderer;

  @Output() nodeClicked = new EventEmitter<{ $event: any, data: TData }>();
  @Output() customEvent = new EventEmitter<{ $event: any, data: TData }>();

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<TData>(node => node[this.nodeChildrenEntryField]);
    this.dataSource = new MatTreeNestedDataSource<TData>();
    this.dataSource.data = this.nodeDatas;
  }

  ngAfterViewInit(): void {
    if (this.customNodeRenderer) {
      this.renderCustom();
    }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.dataSource && changes['nodeDatas']) {
      this.dataSource.data = changes['nodeDatas'].currentValue;
    }
  }

  renderCustom() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.customNodeRenderer);
    this.customRenderWrappers.forEach(wrapper => {
      wrapper.viewContainerRef.clear();
      const componentRef = wrapper.viewContainerRef.createComponent(componentFactory);
      const instance = componentRef.instance as CmsTreeNodeRenderer<TData>;
      if (instance.compInit && typeof (instance.compInit) === 'function') {
        instance.compInit({
          context: this.context,
          tree: this,
          data: wrapper.data,
        });
      }
    });
    this._changeDetectorRef.detectChanges();
  }

  hasChild = (_: number, node: TData) => !!node[this.nodeChildrenEntryField] && node[this.nodeChildrenEntryField].length > 0;

  onNodeClicked($event, data: TData) {
    this.nodeClicked.next({ $event, data });
  }

  triggerCustomEvent(event) {
    this.customEvent.next(event);
  }

}
