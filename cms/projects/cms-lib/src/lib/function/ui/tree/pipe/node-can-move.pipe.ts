import { Pipe, PipeTransform } from '@angular/core';
import { CmsTreeDropPosition } from '../tree.interface';

@Pipe({
  name: 'nodeCanDrag'
})
export class NodeCanDragPipe implements PipeTransform {

  transform<TNode>(data: TNode, canDrag: (data: TNode) => boolean): boolean {
    if (!data || !canDrag) { return true; }
    return canDrag(data);
  }

}

@Pipe({
  name: 'nodeCanDrop'
})
export class NodeCanDropPipe implements PipeTransform {

  transform<TNode>(
    data: TNode,
    canDrop: (data: TNode) => boolean,
  ): boolean {
    if (!data || !canDrop) { return true; }
    return canDrop(data);
  }

}

