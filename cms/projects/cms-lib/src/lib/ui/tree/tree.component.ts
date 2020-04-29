import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'cms-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent<TNode> implements OnInit, OnChanges {

  treeControl: NestedTreeControl<TNode>;
  dataSource: MatTreeNestedDataSource<TNode>;

  @Input() nodeDisplayField = 'name';
  @Input() nodeChildrenEntryField = 'children';
  @Input() nodeDatas: TNode[] = [];

  @Output() nodeClicked = new EventEmitter()

  constructor() {

  }

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<TNode>(node => node[this.nodeChildrenEntryField]);
    this.dataSource = new MatTreeNestedDataSource<TNode>();
    this.dataSource.data = this.nodeDatas;
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.dataSource && changes['nodeDatas']) {
      this.dataSource.data = changes['nodeDatas'].currentValue;
    }
  }

  hasChild = (_: number, node: TNode) => !!node[this.nodeChildrenEntryField] && node[this.nodeChildrenEntryField].length > 0;

  onNodeClicked($event){
    console.warn('$event = ', $event);
  }

}
