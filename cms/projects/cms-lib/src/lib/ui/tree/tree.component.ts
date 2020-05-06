import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ComponentFactoryResolver, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNodeCustomWrapperDirective } from './tree-node-custom-wrapper.directive';
import { CmsTreeNodeRenderer, CmsTree } from './tree.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cms-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent<TData> implements CmsTree<TData>, OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChildren(TreeNodeCustomWrapperDirective) customRenderWrappers: QueryList<TreeNodeCustomWrapperDirective<TData>>;

  treeControl: NestedTreeControl<TData>;
  dataSource: MatTreeNestedDataSource<TData>;

  @Input() context: any;

  @Input() nodeDisplayField = 'name'; // 顯示欄位
  @Input() nodeChildrenEntryField = 'children'; //children的進入口欄位
  @Input() nodeDatas: TData[] = []; // 樹資料
  @Input() defaultExpandLevel = 0; // 預設展開層數：-1=全展開

  selectedNode: TData;
  private _selectedNodeEmitter = new Subject();

  @Input() customNodeRenderer; // 客制的節點Template

  @Output() afterRender = new EventEmitter<TreeComponent<any>>();
  @Output() nodeSelect = new EventEmitter<{ node: TData }>();
  @Output() customEvent = new EventEmitter<{ $event: any, data: TData }>();

  rightClickedNode = new Subject<TData>();

  private _destroy$ = new Subject();

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<TData>(node => node[this.nodeChildrenEntryField]);
    this.dataSource = new MatTreeNestedDataSource<TData>();
    this._setDataSource(this.nodeDatas);

    this._selectedNodeEmitter.pipe(
      takeUntil(this._destroy$),
    ).subscribe(_ => {
      this.nodeSelect.emit({ node: this.selectedNode });
    });
  }

  ngAfterViewInit(): void {
    this._init();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.dataSource && changes['nodeDatas']) {
      this._setDataSource(changes['nodeDatas'].currentValue);
      this._init();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  private _init() {
    this.selectedNode = undefined;
    this._renderCustom();
    this._expandLevel(this.defaultExpandLevel);
    this.afterRender.emit(this);
  }

  private _renderCustom() {
    if (!this.customNodeRenderer) { return }
    this._changeDetectorRef.detectChanges();
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

  private _expandLevel(level: number) {
    if (!this.dataSource.data) { return; }
    if (!level) { return; }
    // 展開全部
    if (level === -1) { this.treeControl.expandAll(); return; }
    // 依照設定展開level
    let nowExpand = 0;
    let datasToExpand = this.dataSource.data || [];
    while (nowExpand < level) {
      let children = [];
      datasToExpand.forEach(data => {
        children = children.concat(this.treeControl.getDescendants(data));
        this.treeControl.expand(data);
      });
      datasToExpand = children;
      nowExpand++;
    }
  }

  private _setDataSource(data: TData[]) {
    this.dataSource.data = data;
    this.treeControl.dataNodes = data;
  }

  hasChild = (_: number, node: TData) => !!node[this.nodeChildrenEntryField] && node[this.nodeChildrenEntryField].length > 0;

  selectNode(node: TData) {
    this._selectNode(node);
  }

  private _selectNode(node: TData) {
    this.selectedNode = node;
    this._selectedNodeEmitter.next();
  }

  onRowRightClicked(node: TData) {
    this.rightClickedNode.next(node);
    this._selectNode(node);
  }

  onRowClicked($event, data: TData) {
    $event.stopPropagation();
    this._selectNode(data);
  }

  @HostListener('document:selectstart', ['$event'])
  onSelectstart(event) {
    event.preventDefault();
  }

  onRowDbClicked($event, data: TData) {
    $event.preventDefault();
    $event.stopPropagation();
    this.treeControl.isExpanded(data) ? this.treeControl.collapse(data) : this.treeControl.expand(data);
  }

  triggerCustomEvent(event) {
    this.customEvent.next(event);
  }

}
