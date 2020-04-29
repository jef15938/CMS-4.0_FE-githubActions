export interface CmsTree<TData> {
  triggerCustomEvent: (event: any) => void;
}

export interface CmsTreeNode<TData> {
  context: any;
  tree: CmsTree<TData>;
  data: TData;
}

export interface CmsTreeNodeRenderer<TData> {
  compInit: (node: CmsTreeNode<TData>) => any;
}