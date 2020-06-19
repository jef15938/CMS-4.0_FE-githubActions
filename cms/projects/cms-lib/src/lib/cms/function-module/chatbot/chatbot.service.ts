import { Injectable } from '@angular/core';
import { ChatbotItem, ChatbotReply } from './chatbot.model';
import { of, Observable, throwError } from 'rxjs';

const DEMO_REPLY_CONTENT = '[{"text":{"text":["感謝您使用新逸資訊服務。"]}},{"payload":{"richContent":[[{"type":"info","title":"新逸資訊","subtitle":"NEUX","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/neuxLOGO.png"}},"actionLink":"http://www.neux.com.tw/index.html"},{"type":"image","rawUrl":"http://www.neux.com.tw/neuximg/neuxLOGO.png","accessibilityText":"Neux"},{"type":"accordion","title":"關於新逸","subtitle":"About NEUX","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/neuxLOGO.png"}},"text":"我們想站在電腦和人文的交會點, 這是賈伯斯在西元2000年的Macworld大會所講到的一段話, 新逸科技秉持這樣的精神在數位世代的介面設計不斷思索從消費者視角看待事物, 讓數位多點”人味”."},{"type":"description","text":["電腦和人文的交會點","讓數位多點”人味”"],"title":"新逸特質"},{"type":"button","icon":{"type":"chevron_right","color":"#FF9800"},"text":"前往多網站管理","link":"","event":{"name":"ExecFuncEvent","languageCode":"","parameters":{"funcId":"routing","funcName":"站內路由","funcParams":{"url":"multi-site"}}}},{"type":"list","title":"清單-功能測試","subtitle":"測試執行功能","event":{"name":"ExecFuncEvent","languageCode":"","parameters":{"funcId":"test","funcName":"測試執行功能","funcParams":null}}},{"type":"chips","options":[{"text":"服務設計","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-1-hov.png"}},"link":"http://www.neux.com.tw/servicedesign.html"},{"text":"方法實力","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-2-hov.png"}},"link":"http://www.neux.com.tw/method.html"},{"text":"客戶案例","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-3-hov.png"}},"link":"http://www.neux.com.tw/customercases.html"},{"text":"新逸團隊","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-4-hov.png"}},"link":"http://www.neux.com.tw/neuxteam.html"},{"text":"聯絡我們","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-5-hov.png"}},"link":"http://www.neux.com.tw/contactus.html"}]}]]}}]';

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
    content: DEMO_REPLY_CONTENT
  },
];

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  getDemoReplyContent(): string {
    return DEMO_REPLY_CONTENT;
  }

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