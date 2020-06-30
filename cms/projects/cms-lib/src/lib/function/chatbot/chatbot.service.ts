import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatbotItem, ChatbotReply } from './chatbot.model';
import { CMS_ENVIROMENT } from '../../global/injection-token';
import { CmsEnviroment } from '../../global/interface';

const DEMO_REPLY_CONTENT = '[{"text":{"text":["感謝您使用新逸資訊服務。"]}},{"payload":{"richContent":[[{"type":"info","title":"新逸資訊","subtitle":"NEUX","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/neuxLOGO.png"}},"actionLink":"http://www.neux.com.tw/index.html"},{"type":"image","rawUrl":"http://www.neux.com.tw/neuximg/neuxLOGO.png","accessibilityText":"Neux"},{"type":"accordion","title":"關於新逸","subtitle":"About NEUX","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/neuxLOGO.png"}},"text":"我們想站在電腦和人文的交會點, 這是賈伯斯在西元2000年的Macworld大會所講到的一段話, 新逸科技秉持這樣的精神在數位世代的介面設計不斷思索從消費者視角看待事物, 讓數位多點”人味”."},{"type":"description","text":["電腦和人文的交會點","讓數位多點”人味”"],"title":"新逸特質"},{"type":"button","icon":{"type":"chevron_right","color":"#FF9800"},"text":"前往多網站管理","link":"","event":{"name":"ExecFuncEvent","languageCode":"","parameters":{"funcId":"routing","funcName":"站內路由","funcParams":{"url":"multi-site"}}}},{"type":"list","title":"清單-功能測試","subtitle":"測試執行功能","event":{"name":"ExecFuncEvent","languageCode":"","parameters":{"funcId":"test","funcName":"測試執行功能","funcParams":null}}},{"type":"chips","options":[{"text":"服務設計","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-1-hov.png"}},"link":"http://www.neux.com.tw/servicedesign.html"},{"text":"方法實力","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-2-hov.png"}},"link":"http://www.neux.com.tw/method.html"},{"text":"客戶案例","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-3-hov.png"}},"link":"http://www.neux.com.tw/customercases.html"},{"text":"新逸團隊","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-4-hov.png"}},"link":"http://www.neux.com.tw/neuxteam.html"},{"text":"聯絡我們","image":{"src":{"rawUrl":"http://www.neux.com.tw/neuximg/icon/menu-5-hov.png"}},"link":"http://www.neux.com.tw/contactus.html"}]}]]}}]';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = '';
  protected type = 'frontend';
  protected execFuncEventName = 'ExecFuncEvent';

  constructor(
    @Inject(CMS_ENVIROMENT) environment: CmsEnviroment,
    private httpClient: HttpClient
  ) {
    this.apiUrl = environment?.chatbot?.apiUrl || '';
    if (this.apiUrl) {
      this.apiUrl += `/chatbot`;
    }
  }

  getDemoReplyContent(): string {
    return DEMO_REPLY_CONTENT;
  }

  getItems(): Observable<ChatbotItem[]> {
    return this.httpClient.get<ChatbotItem[]>(
      `${this.apiUrl}/entity/${this.type}`
    );
  }

  getItemByValue(value: string): Observable<ChatbotItem> {
    return this.httpClient.get<ChatbotItem>(
      `${this.apiUrl}/entity/${value}/${this.type}`
    );
  }

  createItem(toCreate: ChatbotItem): Observable<ChatbotItem> {
    return this.httpClient.post<ChatbotItem>(
      `${this.apiUrl}/entity/${this.type}`,
      { data: toCreate }
    );
  }

  updateItem(toUpdate: ChatbotItem): Observable<ChatbotItem> {
    return this.httpClient.put<ChatbotItem>(
      `${this.apiUrl}/entity/${toUpdate.value}/${this.type}`,
      { data: toUpdate }
    );
  }

  deleteItem(value: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/entity/${value}/${this.type}`
    );
  }

  getReplies(): Observable<ChatbotReply[]> {
    return this.httpClient.get<ChatbotReply[]>(
      `${this.apiUrl}/reply/${this.type}`
    );
  }

  getReplyById(id: number): Observable<ChatbotReply> {
    return this.httpClient.get<ChatbotReply>(
      `${this.apiUrl}/reply/${id}/${this.type}`
    );
  }

  createReply(toCreate: ChatbotReply): Observable<ChatbotReply> {
    return this.httpClient.post<ChatbotReply>(
      `${this.apiUrl}/reply/${this.type}`,
      { data: toCreate }
    );
  }

  updateReply(toUpdate: ChatbotReply): Observable<ChatbotReply> {
    return this.httpClient.put<ChatbotReply>(
      `${this.apiUrl}/reply/${toUpdate.id}/${this.type}`,
      { data: toUpdate }
    );
  }

  deleteReply(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/reply/${id}/${this.type}`
    );
  }

  getExecFuncEventName(): string {
    return this.execFuncEventName;
  }

}
