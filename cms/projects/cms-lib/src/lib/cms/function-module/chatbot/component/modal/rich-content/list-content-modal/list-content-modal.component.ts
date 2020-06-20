import { Component, OnInit } from '@angular/core';
import { RichContentType, RichContent } from './../../../../../../service/dialog-flow.service';
import { RichContentModalComponent } from '../rich-content-modal-base';

interface ListContent extends RichContent {
  type: RichContentType.LIST;
  title: string;
  subtitle: string;
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
  selector: 'cms-list-content-modal',
  templateUrl: './list-content-modal.component.html',
  styleUrls: ['./list-content-modal.component.scss']
})
export class ListContentModalComponent extends RichContentModalComponent<ListContent> implements OnInit {

  title = '清單';

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

  createNewModel(): ListContent {
    return {
      type: RichContentType.LIST,
      title: '',
      subtitle: '',
    };
  }

  ngOnInit(): void {
    super.ngOnInit();

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

  onIsEventChange() {
    if (this.isEvent) {
      this.selectedFunc = JSON.parse(JSON.stringify(this.functions[0]));
      this.selectedFunc.funcParams = this.functions[0].funcParams;
      this.contentModel.event = {
        name: 'ExecFuncEvent',
        languageCode: 'zh-tw',
        parameters: JSON.parse(JSON.stringify(this.selectedFunc)),
      };
      this.contentModel.event.parameters.funcParams = this.selectedFunc.funcParams;
    } else {
      this.selectedFunc = null;
      delete this.contentModel.event;
    }
  }

  onFuncSelectionChange() {
    const selectedFunc = this.functions.find(func => func.funcId === this.selectedFunc.funcId);
    this.selectedFunc.funcName = selectedFunc.funcName;
    this.selectedFunc.funcParams = selectedFunc.funcParams;
    this.contentModel.event = {
      name: 'ExecFuncEvent',
      languageCode: 'zh-tw',
      parameters: JSON.parse(JSON.stringify(this.selectedFunc)),
    };
    this.contentModel.event.parameters.funcParams = this.selectedFunc.funcParams;
  }

  confirm() {
    const content: ListContent = JSON.parse(JSON.stringify(this.contentModel));

    if (this.isEvent && this.selectedFunc) {
      content.event = {
        name: 'ExecFuncEvent',
        languageCode: 'zh-tw',
        parameters: JSON.parse(JSON.stringify(this.selectedFunc)),
      };
    } else {
      delete content.event;
    }

    this.close(content);
  }

}
