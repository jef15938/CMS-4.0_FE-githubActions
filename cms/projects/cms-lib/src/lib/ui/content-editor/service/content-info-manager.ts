import { ContentInfo } from '../../../neuxAPI/bean/ContentInfo';

class ContentInfoState {

  private _action: string;
  get action() { return `action: ${this._action}`; };
  set action(action: string) { this._action = action };

  constructor(
    public snapShot: ContentInfo,
    action?: string,
  ) {
    this._action = action || '';
  }
}

export class ContentInfoManager {

  private _originState: ContentInfoState;

  currentIndex = 0;
  states: ContentInfoState[] = [];

  currentState: ContentInfoState;
  get contentInfoEditModel(): ContentInfo { return this.currentState?.snapShot; };

  get hasPreviousState(): boolean {
    return this.currentIndex > 0;
  };

  get hasNextState(): boolean {
    return this.currentIndex > -1 && this.currentIndex !== this.states.length;
  };

  constructor(
    originContentInfo: ContentInfo,
  ) {
    this._originState = new ContentInfoState(JSON.parse(JSON.stringify(originContentInfo)), 'origin');
    this.currentState = this._getInitState();
  }

  private _getInitState() {
    return new ContentInfoState(JSON.parse(JSON.stringify(this._originState.snapShot)));
  }

  preserveState(action: string = 'Unknow') {
    const nowSnapShot = JSON.parse(JSON.stringify(this.currentState.snapShot));
    this.states.splice(this.currentIndex, this.states.length - this.currentIndex, new ContentInfoState(JSON.parse(JSON.stringify(nowSnapShot)), action));
    this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(nowSnapShot)), action);
    this.currentIndex++;
  }

  back() {
    if (!this.hasPreviousState) { return; }
    const previous = this.currentIndex === 1 ? this._originState : this.states[this.currentIndex - 2];
    this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(previous.snapShot)), previous.action);
    this.currentIndex--;
  }

  forward() {
    if (!this.hasNextState) { return; }
    const next = this.states[this.currentIndex];
    this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(next.snapShot)), next.action);
    this.currentIndex++;
  }
}