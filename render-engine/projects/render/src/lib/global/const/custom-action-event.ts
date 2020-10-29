
import { shareReplay } from 'rxjs/operators';
import { customAction } from './custom-action-subject';

export const customActionEvent = customAction.pipe(shareReplay());
