import { Pipe, PipeTransform, ComponentRef } from '@angular/core';
import { CmsTree, CmsTreeNodeRenderer } from '../tree.interface';

@Pipe({
  name: 'nodeRenderOnload'
})
export class NodeRenderOnloadPipe implements PipeTransform {

  transform(
    tree: CmsTree<any>,
    data,
    context
  ): (componentRef: ComponentRef<CmsTreeNodeRenderer<any>>) => void {
    return (componentRef: ComponentRef<CmsTreeNodeRenderer<any>>) => {
      const instance = componentRef.instance;
      if (instance?.compInit) {
        instance.compInit({
          tree,
          data,
          context,
        });
        if (tree.onCustomNodeRendererInit) {
          tree.onCustomNodeRendererInit(componentRef);
        }
      }
    };
  }

}
