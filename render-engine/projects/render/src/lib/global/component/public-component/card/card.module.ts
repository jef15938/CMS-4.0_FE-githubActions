import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../../pipe/pipe.module';
import { CardLinkFrameComponent } from './card-link-frame/card-link-frame.component';
import { CardLinkComponent } from './card-link/card-link.component';
import { CardNewsComponent } from './card-news/card-news.component';
import { CardJournalComponent } from './card-journal/card-journal.component';
import { CardActivityComponent } from './card-activity/card-activity.component';
import { CardNewsListComponent } from './card-news-list/card-news-list.component';


@NgModule({
  declarations: [
    CardLinkFrameComponent,
    CardLinkComponent,
    CardNewsComponent,
    CardJournalComponent,
    CardActivityComponent,
    CardNewsListComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ],
  exports: [
    CardLinkFrameComponent,
    CardLinkComponent,
    CardNewsComponent,
    CardJournalComponent,
    CardActivityComponent,
    CardNewsListComponent
  ]
})
export class CardModule {

}
