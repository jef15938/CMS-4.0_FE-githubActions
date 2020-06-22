import { Component, OnInit } from '@angular/core';
import { Observable, concat, of } from 'rxjs';
import { tap, concatMap, map } from 'rxjs/operators';
import { ColDef } from '@cms-lib/ui/table';
import { ModalService } from '@cms-lib/ui/modal';
import { ChatbotItem } from '../chatbot.model';
import { ChatbotService } from '../chatbot.service';
import { ItemActionCellComponent, ItemActionCellCustomEvent } from '../component/cell-renderer/item-action-cell/item-action-cell.component';
import { CreateEditItemModalComponent } from '../component/modal/create-edit-item-modal/create-edit-item-modal.component';

@Component({
  selector: 'cms-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  items: ChatbotItem[];

  colDefs: ColDef[] = [
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
        case event.ActionType.Edit:
          action = this.updateItem(event.data);
          break;
        case event.ActionType.Delete:
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
      }
    }).pipe(
      concatMap(res => {
        return res ? this.getItems() : of(undefined);
      }),
    ).subscribe();
  }

  updateItem(item: ChatbotItem) {
    return this.modalService.openComponent({
      component: CreateEditItemModalComponent,
      componentInitData: {
        action: 'Update',
        itemValue: item.value,
      }
    });
  }

}
