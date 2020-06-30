import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { TypeFactory } from '../type-factory';

class PublishInfoTime {
  start_time: string;
  end_time: string;
}

export class PublishInfo {

  public draft: PublishInfoTime;
  public pending_published: PublishInfoTime;
  public published: PublishInfoTime;


}
