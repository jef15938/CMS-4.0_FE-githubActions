import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotComponent } from './chatbot.component';
import { ItemComponent } from './item/item.component';
import { ReplyComponent } from './reply/reply.component';
import { SharedModule } from '../../../shared/shared.module';
import { ItemActionCellComponent } from './component/cell-renderer/item-action-cell/item-action-cell.component';
import { CreateEditItemModalComponent } from './component/modal/create-edit-item-modal/create-edit-item-modal.component';
import { CreateEditReplyModalComponent } from './component/modal/create-edit-reply-modal/create-edit-reply-modal.component';
import { ReplyActionCellComponent } from './component/cell-renderer/reply-action-cell/reply-action-cell.component';

@NgModule({
  declarations: [
    ChatbotComponent,
    ItemComponent,
    ReplyComponent,
    ItemActionCellComponent,
    CreateEditItemModalComponent,
    ReplyActionCellComponent,
    CreateEditReplyModalComponent,
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    SharedModule,
  ],
})
export class ChatbotModule { }
