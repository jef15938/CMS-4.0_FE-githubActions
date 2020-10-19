import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotComponent } from './component/chatbot/chatbot.component';
import { ItemComponent } from './component/item/item.component';
import { ReplyComponent } from './component/reply/reply.component';
import { ItemActionCellComponent } from './component/item-action-cell/item-action-cell.component';
import { CreateEditItemModalComponent } from './component/create-edit-item-modal/create-edit-item-modal.component';
import { CreateEditReplyModalComponent } from './component/create-edit-reply-modal/create-edit-reply-modal.component';
import { ReplyActionCellComponent } from './component/reply-action-cell/reply-action-cell.component';
import { InfoContentModalComponent } from './component/rich-content/info-content-modal/info-content-modal.component';
import { DescriptionContentModalComponent } from './component/rich-content/description-content-modal/description-content-modal.component';
import { ImageContentModalComponent } from './component/rich-content/image-content-modal/image-content-modal.component';
import { ButtonContentModalComponent } from './component/rich-content/button-content-modal/button-content-modal.component';
import { ListContentModalComponent } from './component/rich-content/list-content-modal/list-content-modal.component';
import { AccordionContentModalComponent } from './component/rich-content/accordion-content-modal/accordion-content-modal.component';
import { ChipsContentModalComponent } from './component/rich-content/chips-content-modal/chips-content-modal.component';
import { ChipOptionCreateEditModalComponent } from './component/rich-content/chip-option-create-edit-modal/chip-option-create-edit-modal.component';
import { CmsItemComponent } from './component/item/cms-item.component';
import { CmsReplyComponent } from './component/reply/cms-reply.component';

@NgModule({
  imports: [
    SharedModule,
    ChatbotRoutingModule,
  ],
  declarations: [
    ChatbotComponent,
    ItemComponent,
    CmsItemComponent,
    ReplyComponent,
    CmsReplyComponent,
    ItemActionCellComponent,
    CreateEditItemModalComponent,
    ReplyActionCellComponent,
    CreateEditReplyModalComponent,
    InfoContentModalComponent,
    DescriptionContentModalComponent,
    ImageContentModalComponent,
    ButtonContentModalComponent,
    ListContentModalComponent,
    AccordionContentModalComponent,
    ChipsContentModalComponent,
    ChipOptionCreateEditModalComponent,
  ],
})
export class ChatbotModule { }
