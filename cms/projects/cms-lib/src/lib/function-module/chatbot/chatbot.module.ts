import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotComponent } from './chatbot.component';
import { ItemComponent } from './item/item.component';
import { ReplyComponent } from './reply/reply.component';
import { ItemActionCellComponent } from './component/cell-renderer/item-action-cell/item-action-cell.component';
import { CreateEditItemModalComponent } from './component/modal/create-edit-item-modal/create-edit-item-modal.component';
import { CreateEditReplyModalComponent } from './component/modal/create-edit-reply-modal/create-edit-reply-modal.component';
import { ReplyActionCellComponent } from './component/cell-renderer/reply-action-cell/reply-action-cell.component';
import { InfoContentModalComponent } from './component/modal/rich-content/info-content-modal/info-content-modal.component';
import { DescriptionContentModalComponent } from './component/modal/rich-content/description-content-modal/description-content-modal.component';
import { ImageContentModalComponent } from './component/modal/rich-content/image-content-modal/image-content-modal.component';
import { ButtonContentModalComponent } from './component/modal/rich-content/button-content-modal/button-content-modal.component';
import { ListContentModalComponent } from './component/modal/rich-content/list-content-modal/list-content-modal.component';
import { AccordionContentModalComponent } from './component/modal/rich-content/accordion-content-modal/accordion-content-modal.component';
import { ChipsContentModalComponent } from './component/modal/rich-content/chips-content-modal/chips-content-modal.component';
import { ChipOptionCreateEditModalComponent } from './component/modal/rich-content/chip-option-create-edit-modal/chip-option-create-edit-modal.component';
import { CmsItemComponent } from './item/cms-item.component';
import { CmsReplyComponent } from './reply/cms-reply.component';

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
