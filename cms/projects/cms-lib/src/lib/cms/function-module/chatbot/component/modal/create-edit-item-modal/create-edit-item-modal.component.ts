import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../../../ui/modal/custom-modal-base';
import { ChatbotService } from '../../../chatbot.service';
import { of } from 'rxjs';
import { ChatbotItem, ChatbotReply } from '../../../chatbot.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cms-create-edit-item-modal',
  templateUrl: './create-edit-item-modal.component.html',
  styleUrls: ['./create-edit-item-modal.component.scss']
})
export class CreateEditItemModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}項目`;
  actions: CustomModalActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  itemValue: string;

  item: ChatbotItem;

  replies: ChatbotReply[] = [];

  synonym = '';

  constructor(
    private chatbotService: ChatbotService
  ) {
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
    item.replyId = null;
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
