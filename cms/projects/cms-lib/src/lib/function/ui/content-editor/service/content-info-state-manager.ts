import { ContentInfo } from './../../../../global/api/neuxAPI/bean/ContentInfo';

class ContentInfoState {
  constructor(
    public snapShot: ContentInfo,
    public action?: string,
  ) { }
}

export class ContentInfoStateManager {
  private originState: ContentInfoState;

  currentIndex = 0;
  states: ContentInfoState[] = [];

  currentState: ContentInfoState;
  get contentInfoEditModel(): ContentInfo { return this.currentState?.snapShot; }

  hasPreviousState = false;
  hasNextState = false;

  constructor(
    originContentInfo: ContentInfo,
  ) {
    this.originState = new ContentInfoState(JSON.parse(JSON.stringify(originContentInfo)), 'origin');
    this.currentState = this.getInitState();
  }

  private getInitState() {
    return new ContentInfoState(JSON.parse(JSON.stringify(this.originState.snapShot)));
  }

  resetState() {
    const previous = this.currentIndex === 0 ? this.originState : this.states[this.currentIndex - 1];
    this.currentState.snapShot = JSON.parse(JSON.stringify(previous.snapShot));
  }

  preserveState(action: string = 'Unknow') {
    const nowSnapShot = JSON.parse(JSON.stringify(this.currentState.snapShot));
    this.states.splice(
      this.currentIndex,
      this.states.length - this.currentIndex,
      new ContentInfoState(JSON.parse(JSON.stringify(nowSnapShot)), action)
    );
    // this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(nowSnapShot)), action);
    this.currentIndex++;
    this.calHasState();
  }

  back(step = 1) {
    if (step < 0) { return this.forward(0 - step); }
    for (let i = 0; i < step; ++i) {
      if (!this.hasPreviousState) { return; }
      const previous = this.currentIndex === 1 ? this.originState : this.states[this.currentIndex - 2];
      this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(previous.snapShot)), previous.action);
      this.currentIndex--;
      this.calHasState();
    }
  }

  forward(step = 1) {
    if (step < 0) { return this.back(0 - step); }
    for (let i = 0; i < step; ++i) {
      if (!this.hasNextState) { return; }
      const next = this.states[this.currentIndex];
      this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(next.snapShot)), next.action);
      this.currentIndex++;
      this.calHasState();
    }
  }

  private calHasState() {
    this.hasPreviousState = this.currentIndex > 0;
    this.hasNextState = this.currentIndex > -1 && this.currentIndex !== this.states.length;
  }
}
