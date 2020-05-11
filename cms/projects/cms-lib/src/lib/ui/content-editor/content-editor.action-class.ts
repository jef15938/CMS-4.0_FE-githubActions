import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';

export abstract class EditorAction<Target> {
  abstract type: { name: string };
  abstract undo(): void;
  abstract redo(): void;
  abstract do(): void;

  constructor(
    public target: Target
  ) { }

  toString() {
    return this.type.name;
  }
}

export class AddTemplateAction extends EditorAction<{ contentInfo: ContentInfo, position: number, template: ContentTemplateInfo }> {
  type = AddTemplateAction;

  undo(): void {
    const target = this.target;
    target.contentInfo.templates.splice(target.position, 1);
  }

  redo(): void {
    this.do();
  }

  do(): void {
    const target = this.target;
    target.contentInfo.templates.splice(target.position, 0, this.target.template);
  }

  toString() {
    return `${super.toString()}：position[${this.target.position}]`;
  }
}