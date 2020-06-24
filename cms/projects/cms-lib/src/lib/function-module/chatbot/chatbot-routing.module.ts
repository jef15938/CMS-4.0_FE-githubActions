import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatbotComponent } from './chatbot.component';
import { ItemComponent } from './item/item.component';
import { ReplyComponent } from './reply/reply.component';
import { CmsItemComponent } from './item/cms-item.component';
import { CmsReplyComponent } from './reply/cms-reply.component';

const routes: Routes = [
  {
    path: '', component: ChatbotComponent,
    children: [
      {
        path: 'item', component: ItemComponent
      },
      {
        path: 'reply', component: ReplyComponent
      },
      {
        path: 'cms-item', component: CmsItemComponent
      },
      {
        path: 'cms-reply', component: CmsReplyComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatbotRoutingModule { }
