import {
  Component, OnInit, Input, OnChanges, Output, EventEmitter,
  AfterViewInit, ViewChildren, QueryList, HostListener, OnDestroy, SimpleChanges,
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsTree, CmsTreeCustomCellEvent } from './tree.interface';
import { DynamicWrapperDirective } from '@neux/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'cms-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent<TData> implements CmsTree<TData>, OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChildren(DynamicWrapperDirective) customRenderWrappers: QueryList<DynamicWrapperDirective<TData>>;

  treeControl: NestedTreeControl<TData>;
  dataSource: MatTreeNestedDataSource<TData>;

  @Input() context: any;

  @Input() nodeDisplayField = 'name'; // 顯示欄位
  @Input() nodeChildrenEntryField = 'children'; // children的進入口欄位
  @Input() nodeDatas: TData[] = []; // 樹資料
  @Input() defaultExpandLevel = 0; // 預設展開層數：-1=全展開

  selectedNode: TData;
  private selectedNodeEmitter = new Subject();

  @Input() customNodeRenderer; // 客製的節點Template
  @Input() onCustomNodeRendererInit: (customRender: any) => void;

  @Output() afterRender = new EventEmitter<TreeComponent<any>>();
  @Output() nodeSelect = new EventEmitter<{ node: TData }>();
  @Output() customEvent = new EventEmitter<CmsTreeCustomCellEvent>();

  rightClickedNode = new Subject<TData>();

  private destroy$ = new Subject();

  /* Drag and drop */
  @Input() draggable = false;
  @Output() dragTo = new EventEmitter<{ target: TData, to: TData }>();
  readonly dragGhostId = 'drag-ghost';
  dragNode: any;
  dragEvent: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number;

  /** Checkbox */
  @Input() checkbox = false;
  @Input() checkedNodes: TData[] = [];
  @Input() checkMode: 'single' | 'multiple' = 'multiple';
  @Output() nodeCheckedChange = new EventEmitter<{ nodes: TData[] }>();
  @Input() checkboxDisabled = (node: TData) => false;

  constructor() { }

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
    // this.renderCustom();
    this.expandLevel(this.defaultExpandLevel);
    this.afterRender.emit(this);
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
    const existing = document.getElementById(this.dragGhostId);
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
    console.log(event.target);
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
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }
  }

  handleDrop(event, node) {
    console.log(node);
    if (!this.draggable) { return; }
    event.preventDefault();
    if (node !== this.dragNode) {
      this.dragTo.emit({ target: this.dragNode, to: this.dragNodeExpandOverNode || this.dragNode });
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event) {
    const ghost = document.getElementById(this.dragGhostId);
    if (ghost) { document.body.removeChild(ghost); }
    if (!this.draggable) { return; }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  onNodeCheckboxChange(ev: MatCheckboxChange, node: TData) {
    if (ev.checked && this.checkedNodes.indexOf(node) < 0) {
      if (this.checkMode === 'multiple') {
        this.checkedNodes.push(node);
      } else {
        this.checkedNodes.length = 0;
        this.checkedNodes.push(node);
      }
    }
    if (!ev.checked && this.checkedNodes.indexOf(node) > -1) {
      this.checkedNodes.splice(this.checkedNodes.indexOf(node), 1);
    }
    this.nodeCheckedChange.emit({ nodes: this.checkedNodes });
  }

  getSelectedNodes(): TData[] {
    return [].concat(this.checkedNodes);
  }

  prevOrNextDragOver(event){
    event.target.classList.add('cms-tree__node__head__anchor--drag-overed');
  }

  prevOrNextDragLeave(event){
    event.target.classList.remove('cms-tree__node__head__anchor--drag-overed');
  }
}
