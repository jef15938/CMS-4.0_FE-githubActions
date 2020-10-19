import { Injectable } from '@angular/core';
import { ChatbotService } from './chatbot.service';

@Injectable({
  providedIn: 'root'
})
export class CmsChatbotService extends ChatbotService {
  protected type = 'cms';
  protected execFuncEventName = 'ExecCmsFuncEvent';
}
