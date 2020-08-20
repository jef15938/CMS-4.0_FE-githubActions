import { Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ContentInfoModel } from '../../../../global/api/data-model/models/content-info.model';

class ContentInfoState {
  constructor(
    public snapShot: ContentInfoModel,
    public action?: string,
  ) { }
}

export class ContentInfoStateManager {

  private stateChange$ = new Subject();
  stateChange: Observable<ContentInfoState>;

  private originState: ContentInfoState;

  currentIndex = 0;
  states: ContentInfoState[] = [];

  currentState: ContentInfoState;
  get contentInfoEditModel(): ContentInfoModel { return this.currentState?.snapShot; }

  hasPreviousState = false;
  hasNextState = false;

  constructor(
    originContentInfo: ContentInfoModel,
  ) {
    this.stateChange = this.stateChange$.pipe(shareReplay<ContentInfoState>(1));
    this.originState = new ContentInfoState(JSON.parse(JSON.stringify(originContentInfo)), 'origin');
    this.currentState = this.getInitState();
  }

  private getInitState() {
    return new ContentInfoState(JSON.parse(JSON.stringify(this.originState.snapShot)));
  }

  private emitStateChange() {
    this.stateChange$.next(this.currentState);
  }

  resetState() {
    const previous = this.currentIndex === 0 ? this.originState : this.states[this.currentIndex - 1];
    this.currentState.snapShot = JSON.parse(JSON.stringify(previous.snapShot));
    this.emitStateChange();
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
    this.emitStateChange();
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
    this.emitStateChange();
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
    this.emitStateChange();
  }

  private calHasState() {
    this.hasPreviousState = this.currentIndex > 0;
    this.hasNextState = this.currentIndex > -1 && this.currentIndex !== this.states.length;
  }
}
