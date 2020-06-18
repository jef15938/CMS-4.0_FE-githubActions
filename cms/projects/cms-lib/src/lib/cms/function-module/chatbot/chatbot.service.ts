import { Injectable } from '@angular/core';
import { ChatbotItem, ChatbotReply } from './chatbot.model';
import { of, Observable, throwError } from 'rxjs';

const ITEMS: ChatbotItem[] = [
  {
    value: '項目-保險產品',
    synonyms: ['保保險', '申請保險', '保險項目', '找保險'],
    replyId: 1,
  }
];

const REPLIES: ChatbotReply[] = [
  {
    id: 1,
    name: '回覆-保險產品',
    content: '[{"text":{"text":["哈哈哈"]}},{"payload":{"richContent":[[{"type":"info","title":"Info item title","subtitle":"Info item subtitle","image":{"src":{"rawUrl":"https://www.apple.com/v/apple-events/home/e/images/overview/meta/og__fodnljjkwl6y.png?201910110233"}},"actionLink":"https://www.google.com.tw"},{"type":"image","rawUrl":"https://www.apple.com/v/apple-events/home/e/images/overview/meta/og__fodnljjkwl6y.png?201910110233","accessibilityText":"My logo"},{"type":"button","icon":{"type":"chevron_right","color":"#FF9800"},"text":"Button text","link":"https://www.google.com.tw","event":{"name":"","languageCode":"","parameters":{}}},{"type":"chips","options":[{"text":"Chip 1","image":{"src":{"rawUrl":"https://example.com/images/logo.png"}},"link":"https://example.com"},{"text":"Chip 2","image":{"src":{"rawUrl":"https://example.com/images/logo.png"}},"link":"https://example.com"}]}]]}}]',
  },
];

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  getItems(): Observable<ChatbotItem[]> {
    const items = ITEMS.map(item => JSON.parse(JSON.stringify(item)));
    return of(items);
  }

  getItemByValue(value: string): Observable<ChatbotItem> {
    const sameId = ITEMS.find(item => item.value === value);
    if (!sameId) {
      return throwError('無此筆資料');
    }
    return of(JSON.parse(JSON.stringify(sameId)));
  }

  createItem(toCreate: ChatbotItem): Observable<ChatbotItem> {
    const sameId = ITEMS.find(item => item.value === toCreate.value);
    if (sameId) {
      return throwError('value 重複');
    }
    ITEMS.unshift(toCreate);
    return of(toCreate);
  }

  updateItem(toUpdate: ChatbotItem): Observable<ChatbotItem> {
    const sameId = ITEMS.find(item => item.value === toUpdate.value);
    if (!sameId) {
      return throwError('無此筆資料');
    }
    sameId.synonyms = [].concat(toUpdate.synonyms);
    sameId.replyId = toUpdate.replyId;
    return of(toUpdate);
  }

  deleteItem(value: string): Observable<any> {
    const toDelete = ITEMS.find(item => item.value === value);
    if (toDelete) {
      ITEMS.splice(ITEMS.indexOf(toDelete), 1);
    }
    return of(undefined);
  }

  getReplies(): Observable<ChatbotReply[]> {
    const replies = REPLIES.map(reply => JSON.parse(JSON.stringify(reply)));
    return of(replies);
  }

  getReplyById(id: number): Observable<ChatbotReply> {
    const sameId = REPLIES.find(item => item.id === id);
    if (!sameId) {
      return throwError('無此筆資料');
    }
    return of(JSON.parse(JSON.stringify(sameId)));
  }

  createReply(toCreate: ChatbotReply): Observable<ChatbotReply> {
    const sameId = REPLIES.find(reply => reply.id === toCreate.id);
    if (sameId) {
      return throwError('id 重複');
    }
    const maxId = Math.max(...REPLIES.map(r => r.id)) || 0;
    toCreate.id = maxId + 1;
    REPLIES.unshift(toCreate);
    return of(toCreate);
  }

  updateReply(toUpdate: ChatbotReply): Observable<ChatbotReply> {
    const sameId = REPLIES.find(item => item.id === toUpdate.id);
    if (!sameId) {
      return throwError('無此筆資料');
    }
    sameId.name = toUpdate.name;
    sameId.content = toUpdate.content;
    return of(toUpdate);
  }

  deleteReply(id: number): Observable<any> {
    const toDelete = REPLIES.find(reply => reply.id === id);
    if (toDelete) {
      REPLIES.splice(REPLIES.indexOf(toDelete), 1);
    }
    return of(undefined);
  }

}