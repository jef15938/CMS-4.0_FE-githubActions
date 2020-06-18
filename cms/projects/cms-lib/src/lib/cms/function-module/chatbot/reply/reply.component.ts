import { Component, OnInit } from '@angular/core';
import { Observable, concat, of } from 'rxjs';
import { tap, map, concatMap } from 'rxjs/operators';
import { ColDef } from './../../../../ui/table/table.interface';
import { ChatbotReply } from '../chatbot.model';
import { ModalService } from './../../../../ui/modal/modal.service';
import { ChatbotService } from '../chatbot.service';
import { ReplyActionCellComponent, ReplyActionCellCustomEvent } from '../component/cell-renderer/reply-action-cell/reply-action-cell.component';
import { CreateEditReplyModalComponent } from '../component/modal/create-edit-reply-modal/create-edit-reply-modal.component';

@Component({
  selector: 'cms-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  replies: ChatbotReply[];

  colDefs: ColDef[] = [
    {
      colId: 'name',
      field: 'name',
      title: '回覆名稱',
    },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: ReplyActionCellComponent,
    }
  ];

  constructor(
    private chatbotService: ChatbotService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.init().subscribe();
  }

  private init(): Observable<any> {
    return concat(
      this.getReplies(),
    )
  }

  private getReplies(): Observable<ChatbotReply[]> {
    return this.chatbotService.getReplies().pipe(
      tap(replies => this.replies = replies),
    );
  }

  onCustomEvent(event: any) {
    if (event instanceof ReplyActionCellCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.Edit:
          action = this.updateReply(event.data);
          break;
        case event.ActionType.Delete:
          action = this.chatbotService.deleteReply(event.data.id).pipe(
            map(_ => 'Deleted')
          );
          break;
      }
      action ? action.pipe(
        concatMap(res => res ? this.getReplies() : of(undefined)),
      ).subscribe() : null;
    }
  }

  createReply() {
    this.modalService.openComponent({
      component: CreateEditReplyModalComponent,
      componentInitData: {
        action: 'Create',
      }
    }).pipe(
      concatMap(res => {
        return res ? this.getReplies() : of(undefined)
      }),
    ).subscribe();
  }

  updateReply(reply: ChatbotReply) {
    return this.modalService.openComponent({
      component: CreateEditReplyModalComponent,
      componentInitData: {
        action: 'Update',
        replyId: reply.id,
      }
    });
  }

}
