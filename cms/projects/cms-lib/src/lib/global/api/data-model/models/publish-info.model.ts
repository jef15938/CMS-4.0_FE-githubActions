import { PublishInfo } from '../../neuxAPI/bean/PublishInfo';
import { ModelMapping } from '@neux/core';

class PublishInfoTime {
  start_time: string;
  end_time: string;
}

class PublishInfoTimeModel {
  startTime: string;
  endTime: string;

  constructor(startTime: string, endTime: string, ) {
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

// @dynamic
@ModelMapping(
  PublishInfo, PublishInfoModel,
  (bean, model) => {
    const draft = bean.draft as PublishInfoTime;
    const pendingPublished = bean.pending_published as PublishInfoTime;
    const published = bean.published as PublishInfoTime;

    model.draft = draft ? new PublishInfoTimeModel(draft.start_time, draft.end_time) : null;
    model.pendingPublished = pendingPublished
      ? new PublishInfoTimeModel(pendingPublished.start_time, pendingPublished.end_time) : null;
    model.published = published ?
      new PublishInfoTimeModel(published.start_time, published.end_time) : null;
  }
)
export class PublishInfoModel {

  public draft: PublishInfoTimeModel;
  public pendingPublished: PublishInfoTimeModel;
  public published: PublishInfoTimeModel;

}
