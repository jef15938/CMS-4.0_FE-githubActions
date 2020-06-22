import { Component } from '@angular/core';
import { RichContentType, RichContent } from '@cms-lib/cms/service';
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
