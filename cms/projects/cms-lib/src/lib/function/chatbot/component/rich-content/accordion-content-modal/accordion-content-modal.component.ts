import { Component, Injector } from '@angular/core';
import { RichContentType } from '../../../../../global/enum';
import { RichContent } from '../../../../../global/interface';
import { RichContentModalComponent } from '../rich-content-modal-base';

interface AccordionContent extends RichContent {
  type: RichContentType.ACCORDION;
  title: string;
  subtitle: string;
  image: {
    src: {
      rawUrl: string;
    }
  };
  text: string;
}

@Component({
  selector: 'cms-accordion-content-modal',
  templateUrl: './accordion-content-modal.component.html',
  styleUrls: ['./accordion-content-modal.component.scss']
})
export class AccordionContentModalComponent extends RichContentModalComponent<AccordionContent> {

  title = '折疊';

  constructor(
    injector: Injector,
  ) { super(injector); }

  createNewModel(): AccordionContent {
    return {
      type: RichContentType.ACCORDION,
      title: '',
      subtitle: '',
      image: {
        src: {
          rawUrl: '',
        }
      },
      text: '',
    };
  }

}
