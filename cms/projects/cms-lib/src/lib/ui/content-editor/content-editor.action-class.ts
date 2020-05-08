export class EditorAction {
  constructor(
    public type: typeof EditorAction
  ) { }

  toString() {
    return this.type.name;
  }
}

export class AddTemplateAction extends EditorAction {
  constructor() {
    super(AddTemplateAction);
  }
}