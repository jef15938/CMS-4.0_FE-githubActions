import { Component, OnInit, Injector } from '@angular/core';
import { RichContentType } from '../../../../../../global/enum';
import { RichContent } from '../../../../../../global/interface';
import { RichContentModalComponent } from '../rich-content-modal-base';

interface ButtonContent extends RichContent {
  type: RichContentType.BUTTON;
  icon?: {
    type: string;
    color?: string;
  };
  text: string;
  link?: string;
  event?: {
    name: string;
    languageCode: string;
    parameters: Func;
  };
}

interface Func {
  funcId: string;
  funcName: string;
  funcParams?: { [key: string]: any };
}

@Component({
  selector: 'cms-button-content-modal',
  templateUrl: './button-content-modal.component.html',
  styleUrls: ['./button-content-modal.component.scss']
})
export class ButtonContentModalComponent extends RichContentModalComponent<ButtonContent> implements OnInit {

  title = '按鈕';

  isLink = false;
  isEvent = false;

  functions: Func[] = [
    {
      funcId: 'test',
      funcName: '測試執行功能',
      funcParams: null,
    },
    {
      funcId: 'routing',
      funcName: '站內路由',
      funcParams: {
        url: '',
      },
    }
  ];

  selectedFunc: Func;

  constructor(
    injector: Injector,
  ) { super(injector); }

  createNewModel(): ButtonContent {
    return {
      type: RichContentType.BUTTON,
      text: '',
      icon: {
        type: '',
        color: '',
      }
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.contentModel.link) {
      this.isLink = true;
    } else {
      this.isLink = false;
    }

    if (this.contentModel.event) {
      const funcIds = this.functions.map(f => f.funcId);
      const func = this.contentModel.event.parameters;
      const funcId = func?.funcId;
      const funcIdIndex = funcIds.indexOf(funcId);
      if (funcIdIndex > -1) {
        const selectedFunc = this.functions[funcIdIndex];

        if (!selectedFunc.funcParams) {
          func.funcParams = selectedFunc.funcParams;
        } else if (selectedFunc.funcParams && !func.funcParams) {
          func.funcParams = selectedFunc.funcParams;
        } else if (func.funcParams && selectedFunc.funcParams) {
          const funcParamsKeys = Object.keys(func.funcParams);
          const selectedFuncParamsKeys = Object.keys(selectedFunc.funcParams);

          funcParamsKeys.forEach(key => {
            if (selectedFuncParamsKeys.indexOf(key) < 0) {
              delete func.funcParams[key];
            } else {
              selectedFunc.funcParams[key] = func.funcParams[key];
            }
          });

          selectedFuncParamsKeys.forEach(key => {
            if (funcParamsKeys.indexOf(key) < 0) {
              func.funcParams[key] = selectedFunc.funcParams[key];
            }
          });
          func.funcParams = selectedFunc.funcParams;
        }

        this.selectedFunc = func;
        this.isEvent = true;
      } else {
        delete this.contentModel.event;
        this.isEvent = false;
      }
    }
  }

  checkButtonType(from: 'link' | 'event') {
    if (from === 'link') {
      if (this.isLink) {
        this.contentModel.link = this.contentModel.link || '';
        this.isEvent = false;
        delete this.contentModel.event;
      } else {
        delete this.contentModel.link;
      }
    }

    if (from === 'event') {
      if (this.isEvent) {
        this.selectedFunc = JSON.parse(JSON.stringify(this.functions[0]));
        this.selectedFunc.funcParams = this.functions[0].funcParams;
        this.contentModel.event = {
          name: this.chatbotService.getExecFuncEventName(),
          languageCode: 'zh-tw',
          parameters: JSON.parse(JSON.stringify(this.selectedFunc)),
        };
        this.contentModel.event.parameters.funcParams = this.selectedFunc.funcParams;
        this.isLink = false;
        delete this.contentModel.link;
      } else {
        this.selectedFunc = null;
        delete this.contentModel.event;
      }
    }
  }

  onFuncSelectionChange() {
    const selectedFunc = this.functions.find(func => func.funcId === this.selectedFunc.funcId);
    this.selectedFunc.funcName = selectedFunc.funcName;
    this.selectedFunc.funcParams = selectedFunc.funcParams;
    this.contentModel.event = {
      name: this.chatbotService.getExecFuncEventName(),
      languageCode: 'zh-tw',
      parameters: JSON.parse(JSON.stringify(this.selectedFunc)),
    };
    this.contentModel.event.parameters.funcParams = this.selectedFunc.funcParams;
  }

  confirm() {
    const content: ButtonContent = JSON.parse(JSON.stringify(this.contentModel));

    if (this.isEvent && this.selectedFunc) {
      content.event = {
        name: this.chatbotService.getExecFuncEventName(),
        languageCode: 'zh-tw',
        parameters: JSON.parse(JSON.stringify(this.selectedFunc)),
      };
    } else {
      delete content.event;
    }

    if (!content.link) {
      delete content.link;
    }

    this.close(content);
  }

}
