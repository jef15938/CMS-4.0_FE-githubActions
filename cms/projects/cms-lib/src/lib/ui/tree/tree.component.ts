import {
  Component, OnInit, Input, OnChanges, Output, EventEmitter,
  ComponentFactoryResolver, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, HostListener, OnDestroy, SimpleChanges
} from '@angular/core';
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
  @Input() nodeChildrenEntryField = 'children'; // children的進入口欄位
  @Input() nodeDatas: TData[] = []; // 樹資料
  @Input() defaultExpandLevel = 0; // 預設展開層數：-1=全展開

  selectedNode: TData;
  private selectedNodeEmitter = new Subject();

  @Input() customNodeRenderer; // 客制的節點Template

  @Output() afterRender = new EventEmitter<TreeComponent<any>>();
  @Output() nodeSelect = new EventEmitter<{ node: TData }>();
  @Output() customEvent = new EventEmitter<{ $event: any, data: TData }>();

  rightClickedNode = new Subject<TData>();

  private destroy$ = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<TData>(node => node[this.nodeChildrenEntryField]);
    this.dataSource = new MatTreeNestedDataSource<TData>();
    this.setDataSource(this.nodeDatas);

    this.selectedNodeEmitter.pipe(
      takeUntil(this.destroy$),
    ).subscribe(_ => {
      this.nodeSelect.emit({ node: this.selectedNode });
    });
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource && changes.nodeDatas) {
      this.setDataSource(changes.nodeDatas.currentValue);
      this.init();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  private init() {
    this.selectedNode = undefined;
    this.renderCustom();
    this.expandLevel(this.defaultExpandLevel);
    this.afterRender.emit(this);
  }

  private renderCustom() {
    if (!this.customNodeRenderer) { return; }
    this.changeDetectorRef.detectChanges();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.customNodeRenderer);
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
    this.changeDetectorRef.detectChanges();
  }

  private expandLevel(level: number) {
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

  private setDataSource(data: TData[]) {
    this.dataSource.data = data;
    this.treeControl.dataNodes = data;
  }

  hasChild = (_: number, node: TData) => !!node[this.nodeChildrenEntryField] && node[this.nodeChildrenEntryField].length > 0;

  selectNode(node: TData) {
    this.selectedNode = node;
    this.selectedNodeEmitter.next();
  }

  onRowRightClicked(node: TData) {
    this.rightClickedNode.next(node);
    this.selectNode(node);
  }

  onRowClicked($event, data: TData) {
    $event.stopPropagation();
    this.selectNode(data);
  }

  // @HostListener('document:selectstart', ['$event'])
  onSelectstart(event) {
    event.preventDefault();
  }

  onRowDbClicked($event, data: TData) {
    $event.preventDefault();
    $event.stopPropagation();
    this.treeControl.toggle(data);
  }

  triggerCustomEvent(event) {
    this.customEvent.next(event);
  }

  findParent(node: TData, sources: TData[] = this.treeControl.dataNodes || []): TData {
    if (!sources.length) { return null; }
    if (sources.indexOf(node) > -1) { return null; } // 第一層無parent
    const finder: (d: TData) => boolean = (d: TData) => {
      return (d ? d[this.nodeChildrenEntryField] : []).indexOf(node) > -1;
    };
    const parent = sources.find(finder);
    return parent || sources.map(s => this.findParent(node, s ? s[this.nodeChildrenEntryField] : [])).find(finder);
  }

}
