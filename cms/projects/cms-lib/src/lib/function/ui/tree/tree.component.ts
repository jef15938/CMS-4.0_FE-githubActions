import {
  Component, OnInit, Input, OnChanges, Output, EventEmitter,
  AfterViewInit, ViewChildren, QueryList, HostListener, OnDestroy, SimpleChanges, AfterViewChecked, ChangeDetectorRef, ElementRef,
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsTree, CmsTreeCustomCellEvent, CmsTreeDropPosition } from './tree.interface';
import { DynamicWrapperDirective } from '@neux/core';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
  selector: 'cms-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent<TData> implements CmsTree<TData>, OnInit, AfterViewInit, OnChanges, OnDestroy, AfterViewChecked {

  @ViewChildren(DynamicWrapperDirective) customRenderWrappers: QueryList<DynamicWrapperDirective<TData>>;

  treeControl: NestedTreeControl<TData>;
  dataSource: MatTreeNestedDataSource<TData>;

  @Input() context: any;

  @Input() nodeDisplayField: keyof TData; // 顯示欄位
  @Input() nodeChildrenEntryField = 'children'; // children的進入口欄位
  @Input() nodeDatas: TData[] = []; // 樹資料
  @Input() defaultExpandLevel = 0; // 預設展開層數：-1=全展開

  selectedNode: TData;
  private selectedNodeEmitter = new Subject();

  @Input() customNodeRenderer; // 客製的節點Template
  @Input() onCustomNodeRendererInit: (customRender: any) => void;

  private firstTimeRender = true;
  @Output() afterRender = new EventEmitter<{ tree: TreeComponent<any>, firstTime: boolean }>();

  @Output() nodeSelect = new EventEmitter<{ node: TData }>();
  @Output() customEvent = new EventEmitter<CmsTreeCustomCellEvent>();

  rightClickedNode = new Subject<TData>();

  private destroy$ = new Subject();

  /* Drag and drop */
  @Input() draggable = false;
  @Input() canDragNode: (node: TData) => boolean;
  @Input() canDropOnNode: (node: TData) => boolean;
  @Input() canDropOnNodePreviousNext: (node: TData) => boolean;
  @Output() dragToNode = new EventEmitter<{ target: TData, to: TData }>();
  @Output() dragToPosition = new EventEmitter<{ target: TData, to: TData, order: number }>();
  readonly dragGhostId = 'drag-ghost';
  dragNode: any;
  dragEvent: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number;
  dropPosition: CmsTreeDropPosition<TData> = null;

  /** Checkbox */
  @Input() checkbox = false;
  @Input() checkedNodes: TData[] = [];
  @Input() checkMode = 'MULTIPLE'; // 'SINGLE' | 'MULTIPLE'
  @Output() nodeCheckedChange = new EventEmitter<{ node: TData, checked: boolean }>();
  @Output() nodesCheckedChange = new EventEmitter<{ nodes: TData[] }>();
  @Input() checkboxDisabled = (node: TData) => false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) { }

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

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
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
    // this.renderCustom();
    this.expandLevel(this.defaultExpandLevel);
    this.afterRender.emit({ tree: this, firstTime: this.firstTimeRender });
    this.firstTimeRender = false;
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

  onSelectstart(event) {
    event.preventDefault();
  }

  onRowDbClicked($event, data: TData) {
    $event.preventDefault();
    $event.stopPropagation();
    this.treeControl.toggle(data);
  }

  triggerCustomEvent(event: CmsTreeCustomCellEvent) {
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

  private createDragGhost(node: HTMLElement) {
    const existing = (this.elementRef.nativeElement as HTMLElement).querySelector(`#${this.dragGhostId}`);
    if (existing) { document.body.removeChild(existing); }

    const ghost = node.cloneNode(true) as HTMLElement;
    ghost.style.position = 'fixed';
    ghost.style.top = '-1000px';
    ghost.style.zIndex = '9999';
    document.body.appendChild(ghost);
    return ghost;
  }

  handleDragStart(event, node) {
    if (!this.draggable) { return; }
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    const ghost = this.createDragGhost(event.target);
    this.dragEvent = event;
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event, node) {
    if (!this.draggable) { return; }
    event.preventDefault();
    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dropPosition = { node, position: 0 };
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }
  }

  private resetDrag() {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
    this.dropPosition = null;
  }

  handleDragleave(event, node) {
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
    this.dropPosition = null;
  }

  handleDrop(event, node) {
    if (!this.draggable) { return; }
    event.preventDefault();
    if (this.canDropOnNode && !this.canDropOnNode(node)) { return; }
    if (node !== this.dragNode) {
      this.dragToNode.emit({ target: this.dragNode, to: this.dragNodeExpandOverNode || this.dragNode });
    }
    this.resetDrag();
  }

  private changeNodePosition(dropPosition: { node: TData, position: number }): void {
    if (dropPosition.node === this.dragNode) { return; }
    if (this.canDropOnNodePreviousNext && !this.canDropOnNodePreviousNext(dropPosition.node)) { return; }
    const parent = this.findParent(dropPosition.node);
    if (!parent) { return; }
    let order = (parent[this.nodeChildrenEntryField] as TData[]).indexOf(dropPosition.node);
    if (dropPosition.position > 0) { order++; }
    this.dragToPosition.emit({ target: this.dragNode, to: parent, order });
  }

  handleDragEnd(event) {
    const ghost = (this.elementRef.nativeElement as HTMLElement).querySelector(`#${this.dragGhostId}`);
    if (ghost) { document.body.removeChild(ghost); }
    if (!this.draggable) { return; }

    if (this.dropPosition?.position) { // drop 在節點上下的 div
      this.changeNodePosition(this.dropPosition);
    }

    this.resetDrag();
  }

  onNodeCheckboxChange(ev: MatCheckboxChange, node: TData) {
    this.nodeCheckedChange.emit({ node, checked: ev.checked });
    if (ev.checked && this.checkedNodes.indexOf(node) < 0) {
      if (this.checkMode === 'MULTIPLE') {
        this.checkedNodes.push(node);
      } else {
        this.checkedNodes.length = 0;
        this.checkedNodes.push(node);
      }
    }
    if (!ev.checked && this.checkedNodes.indexOf(node) > -1) {
      this.checkedNodes.splice(this.checkedNodes.indexOf(node), 1);
    }
    this.nodesCheckedChange.emit({ nodes: this.checkedNodes });
  }

  getSelectedNodes(): TData[] {
    return [].concat(this.checkedNodes);
  }

  prevOrNextDragOver(event, node: TData, position: number) {
    if (!this.draggable) { return; }
    if (this.canDropOnNodePreviousNext && !this.canDropOnNodePreviousNext(node)) { return; }

    if (node !== this.dragNode) {
      this.dropPosition = { node, position };
      event.target.classList.add('cms-tree__node__head__anchor--drag-overed');
    }
  }

  prevOrNextDragLeave(event) {
    event.target.classList.remove('cms-tree__node__head__anchor--drag-overed');
  }

  toggleTreeNodeExpand(ev: MouseEvent, node: TData) {
    this.treeControl.toggle(node);
    ev.stopPropagation();
    ev.preventDefault();
  }
}
