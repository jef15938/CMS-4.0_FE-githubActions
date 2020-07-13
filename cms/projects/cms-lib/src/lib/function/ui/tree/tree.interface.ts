import { Subject } from 'rxjs';

export interface CmsTreeCustomCellEvent {
  ActionType: any;
  action: any;
  data: any;
}

export interface CmsTree<TData> {
  rightClickedNode: Subject<TData>;
  onCustomNodeRendererInit: (customRender: any) => void;
  selectNode: (node: TData) => void;
  triggerCustomEvent: (event: CmsTreeCustomCellEvent) => void;
}

export interface CmsTreeNode<TData> {
  context: any;
  tree: CmsTree<TData>;
  data: TData;
}

export interface CmsTreeNodeRenderer<TData> {
  compInit: (node: CmsTreeNode<TData>) => any;
}
