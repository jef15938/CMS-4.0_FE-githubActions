import { Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ContentInfoModel } from '../../../../global/api/data-model/models/content-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';

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
    try {
      this.stateChange = this.stateChange$.pipe(shareReplay<ContentInfoState>(1));
      this.originState = new ContentInfoState(JSON.parse(JSON.stringify(originContentInfo)), 'origin');
      this.currentState = this.getInitState();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentInfoStateManager.constructor()', '編輯狀態管理器初始化錯誤');
    }
  }

  private getInitState() {
    try {
      return new ContentInfoState(JSON.parse(JSON.stringify(this.originState.snapShot)));
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentInfoStateManager.getInitState()', '編輯狀態管理器取得初始狀態資料錯誤');
    }
    return null;
  }

  private emitStateChange() {
    this.stateChange$.next(this.currentState);
  }

  resetState() {
    try {
      const previous = this.currentIndex === 0 ? this.originState : this.states[this.currentIndex - 1];
      this.currentState.snapShot = JSON.parse(JSON.stringify(previous.snapShot));
      this.emitStateChange();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentInfoStateManager.resetState()', '編輯狀態管理器重設狀態錯誤');
    }
  }

  preserveState(action: string = 'Unknow') {
    try {
      const nowSnapShot = JSON.parse(JSON.stringify(this.currentState.snapShot));
      this.states.splice(
        this.currentIndex,
        this.states.length - this.currentIndex,
        new ContentInfoState(JSON.parse(JSON.stringify(nowSnapShot)), action)
      );
      this.currentIndex++;
      this.calHasState();
      this.emitStateChange();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentInfoStateManager.preserveState()', '編輯狀態管理器保存狀態錯誤');
    }
  }

  back(step = 1) {
    try {
      if (step < 0) { return this.forward(0 - step); }
      for (let i = 0; i < step; ++i) {
        if (!this.hasPreviousState) { return; }
        const previous = this.currentIndex === 1 ? this.originState : this.states[this.currentIndex - 2];
        this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(previous.snapShot)), previous.action);
        this.currentIndex--;
        this.calHasState();
      }
      this.emitStateChange();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentInfoStateManager.preserveState()', '編輯狀態管理器回復上一步錯誤');
    }
  }

  forward(step = 1) {
    try {
      if (step < 0) { return this.back(0 - step); }
      for (let i = 0; i < step; ++i) {
        if (!this.hasNextState) { return; }
        const next = this.states[this.currentIndex];
        this.currentState = new ContentInfoState(JSON.parse(JSON.stringify(next.snapShot)), next.action);
        this.currentIndex++;
        this.calHasState();
      }
      this.emitStateChange();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentInfoStateManager.preserveState()', '編輯狀態管理器重做下一步錯誤');
    }
  }

  private calHasState() {
    this.hasPreviousState = this.currentIndex > 0;
    this.hasNextState = this.currentIndex > -1 && this.currentIndex !== this.states.length;
  }
}
