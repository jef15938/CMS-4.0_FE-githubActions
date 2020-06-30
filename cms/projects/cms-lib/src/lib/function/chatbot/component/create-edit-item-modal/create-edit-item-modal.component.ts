import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomModalBase, CustomModalActionButton } from '../../../ui/modal';
import { ChatbotService } from '../../service/chatbot.service';
import { ChatbotItem, ChatbotReply } from '../../../../global/model/chatbot.model';

@Component({
  selector: 'cms-create-edit-item-modal',
  templateUrl: './create-edit-item-modal.component.html',
  styleUrls: ['./create-edit-item-modal.component.scss']
})
export class CreateEditItemModalComponent extends CustomModalBase implements OnInit {

  actions: CustomModalActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  itemValue: string;

  item: ChatbotItem;

  replies: ChatbotReply[] = [];

  synonym = '';

  chatbotService: ChatbotService;

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}項目`;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getItem().subscribe();
    this.getReplies().subscribe();
  }

  getItem() {
    return (
      this.action === 'Create'
        ? of(this.createNewItem())
        : this.chatbotService.getItemByValue(this.itemValue)
    ).pipe(
      tap(item => this.item = item),
    );
  }

  getReplies() {
    return this.chatbotService.getReplies().pipe(
      tap(replies => this.replies = replies),
    );
  }

  createNewItem() {
    const item = new ChatbotItem();
    item.value = '';
    item.synonyms = [];
    item.replyID = null;
    return item;
  }

  addSynonym() {
    const synonym = (this.synonym || '').trim();
    if (!synonym) { return; }
    if (this.item.synonyms.indexOf(synonym) < 0) {
      this.item.synonyms.unshift(synonym);
      document.getElementById('synonym-list').scrollTo(0, 0);
    } else {
      alert('已有同樣的同義祠');
    }
    this.synonym = '';
  }

  removeSynonym(synonym: string) {
    synonym = (synonym || '').trim();
    if (!synonym) { return; }
    const index = this.item.synonyms.indexOf(synonym);
    if (index > -1) {
      this.item.synonyms.splice(index, 1);
    }
  }

  private save() {
    return (
      this.action === 'Create'
        ? this.chatbotService.createItem(this.item)
        : this.chatbotService.updateItem(this.item)
    );
  }

  confirm() {
    this.save().subscribe(_ => {
      this.close('Confirm');
    });
  }

}
