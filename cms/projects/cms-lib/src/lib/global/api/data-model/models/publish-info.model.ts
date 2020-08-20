import { PublishInfo } from '../../neuxAPI/bean/PublishInfo';
import { ModelMapping } from '../model-mapper';

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
    model.draft = bean.draft ? new PublishInfoTimeModel(bean.draft.start_time, bean.draft.end_time) : null;
    model.pendingPublished = bean.pending_published
      ? new PublishInfoTimeModel(bean.pending_published.start_time, bean.pending_published.end_time) : null;
    model.published = bean.published ? new PublishInfoTimeModel(bean.published.start_time, bean.published.end_time) : null;
  }
)
export class PublishInfoModel {

  public draft: PublishInfoTimeModel;
  public pendingPublished: PublishInfoTimeModel;
  public published: PublishInfoTimeModel;

}
