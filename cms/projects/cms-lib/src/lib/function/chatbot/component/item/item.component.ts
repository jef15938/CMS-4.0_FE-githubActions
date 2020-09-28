import { Component, OnInit } from '@angular/core';
import { Observable, concat, of } from 'rxjs';
import { tap, concatMap, map } from 'rxjs/operators';
import { ColDef } from '../../../ui/table';
import { ModalService } from '../../../ui/modal';
import { ChatbotItem } from '../../../../global/model/chatbot.model';
import { ChatbotService } from '../../service/chatbot.service';
import { ItemActionCellComponent, ItemActionCellCustomEvent } from '../item-action-cell/item-action-cell.component';
import { CreateEditItemModalComponent } from '../create-edit-item-modal/create-edit-item-modal.component';

@Component({
  selector: 'cms-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  title = '智慧助手 > 項目設定';
  items: ChatbotItem[];

  colDefs: ColDef<ChatbotItem>[] = [
    {
      colId: 'value',
      field: 'value',
      title: '項目名稱',
    },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: ItemActionCellComponent,
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
      this.getItems(),
    );
  }

  private getItems(): Observable<ChatbotItem[]> {
    return this.chatbotService.getItems().pipe(
      tap(items => this.items = items),
    );
  }

  onCustomEvent(event: any) {
    if (event instanceof ItemActionCellCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.EDIT:
          action = this.updateItem(event.data);
          break;
        case event.ActionType.DELETE:
          action = this.chatbotService.deleteItem(event.data.value).pipe(
            map(_ => 'Deleted')
          );
          break;
      }

      if (action) {
        action.pipe(
          concatMap(res => res ? this.getItems() : of(undefined)),
        ).subscribe();
      }
    }
  }

  createItem() {
    this.modalService.openComponent({
      component: CreateEditItemModalComponent,
      componentInitData: {
        action: 'Create',
        chatbotService: this.chatbotService,
      }
    }).pipe(
      concatMap(res => {
        return !!res ? this.getItems() : of(undefined);
      }),
    ).subscribe();
  }

  updateItem(item: ChatbotItem) {
    return this.modalService.openComponent({
      component: CreateEditItemModalComponent,
      componentInitData: {
        action: 'Update',
        itemValue: item.value,
        chatbotService: this.chatbotService,
      }
    });
  }

}
