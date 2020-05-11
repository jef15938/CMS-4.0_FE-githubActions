import { EditorAction } from '../content-editor.action-class';

export class ActionManager {
  latestAction: EditorAction<any>;
  actions: EditorAction<any>[] = [];

  get canUndo(): boolean { return this.actions.indexOf(this.latestAction) > -1 };
  get canRedo(): boolean { return this.actions.indexOf(this.latestAction) !== this.actions.length - 1 };

  doAction<Target>(action: EditorAction<Target>) {
    action.do();
    // 清除後面
    const latestActionIndex = this.actions.indexOf(this.latestAction);
    this.actions.splice(
      latestActionIndex + 1,
      this.actions.length - (latestActionIndex + 1)
    );
    this.latestAction = action;
    this.actions.push(action);
  }

  undo() {
    if (!this.canUndo) { return; }
    this.latestAction.undo();
    const latestActionIndex = this.actions.indexOf(this.latestAction);
    const previousAction = this.actions[latestActionIndex - 1];
    this.latestAction = previousAction;
  }

  redo() {
    if (!this.canRedo) { return; }
    const latestActionIndex = this.actions.indexOf(this.latestAction);
    const nextAction = this.actions[latestActionIndex + 1];
    nextAction.redo();
    this.latestAction = nextAction;
  }
}