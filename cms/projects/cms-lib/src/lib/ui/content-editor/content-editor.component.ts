import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent } from './content-editor.interface';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ActionManager } from './service/action-manager';
import { TabTemplateInfo, FieldType, TemplateInfo, GroupTemplateInfo } from 'layout';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { AddTemplateAction } from './content-editor.action-class';

class ContentInfoModel extends ContentInfo {
  constructor(contentInfo: ContentInfo) {
    super();
    if (!contentInfo) {
      this.templates = [];
    } else {
      this.templates = contentInfo.templates;
    }
  }
}

@Component({
  selector: 'cms-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnDestroy, AfterContentChecked {

  @ViewChild(LayoutControlPanelComponent) layoutControlPanel: LayoutControlPanelComponent;
  @ViewChild(ContentControlPanelComponent) contentControlPanel: ContentControlPanelComponent;

  @Input() contentInfo: ContentInfo;
  contentInfoModel: ContentInfoModel;

  @Input() btnClose = true;
  @Input() btnSave = true;

  @Output() editorClose = new EventEmitter<ContentInfo>();
  @Output() editorSave = new EventEmitter<ContentEditorSaveEvent>();

  actionManager: ActionManager;

  showActionListPanel = true;

  private _saved = true;

  private _destroy$ = new Subject();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this._init();
  }

  ngAfterContentChecked(): void {
    this._changeDetectorRef.detectChanges();
  }

  private _init() {
    this.resetSelected();
    this.contentInfo = this._getMock();
    this.actionManager = new ActionManager();
    this.contentInfoModel = new ContentInfoModel(this.contentInfo);
  }

  private _getMock(): ContentInfo {
    const tabTemplateInfo: TabTemplateInfo = {
      id: '1',
      templateId: 'Tab',
      fields: [],
      attributes: new Map(),
      tabList: [{
        fieldId: '1-1',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extension: new Map(),
        tabId: '1-1',
        children: {
          id: '2',
          templateId: 'IconPage',
          fields: [],
          attributes: new Map(),
          toJson: () => ''
        }
      }, {
        fieldId: '1-2',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extension: new Map(),
        tabId: '1-2',
        children: {
          id: '3',
          templateId: 'Slide',
          fields: [],
          attributes: new Map(),
          toJson: () => ''
        }
      }],
      toJson: () => ''
    };

    const fieldsDemoTemplateInfo: TemplateInfo = {
      id: 'fd01',
      templateId: 'FieldsDemo',
      fields: [
        {
          fieldId: 'f01',
          fieldType: FieldType.TEXT,
          fieldVal: '頁面標題',
          extension: new Map(),
        },
        {
          fieldId: 'f02',
          fieldType: FieldType.TEXTEREA,
          fieldVal: `臣亮言：先帝創業未半，而中道崩殂。今天下三分，益州
          疲弊，此誠危急存亡之秋也。然侍衛之臣，不懈於內；忠志之
          士，忘身於外者，蓋追先帝之殊遇，欲報之於陛下也。誠宜開
          張聖聽，以光先帝遺德，恢弘志士之氣；不宜妄自菲薄，引喻
          失義，以塞忠諫之路也。宮中府中，俱為一體，陟罰臧否，不
          宜異同。若有作姦犯科，及為忠善者，宜付有司，論其刑賞，
          以昭陛下平明之治，不宜篇私，使內外異法也。
           
           　　侍中、侍郎郭攸之、費褘、董允等，此皆良實，志慮忠純
          ，是以先帝簡拔以遺陛下。愚以為宮中之事，事無大小，悉以
          咨之，然後施行，必能裨補闕漏，有所廣益。將軍向寵，性行
          淑均，曉暢軍事，試用於昔日，先帝稱之曰「能」，是以眾議
          舉寵為督。愚以為營中之事，悉以咨之，必能使行陣和睦，優
          劣得所。親賢臣，遠小人，此先漢所以興隆也；親小人，遠賢
          臣，此後漢所以傾頹也。先帝在時，每與臣論此事，未嘗不歎
          息痛恨於桓、靈也。侍中、尚書、長史；參軍，此悉貞良死節
          之臣也，願陛下親之信之，則漢室之隆，可計日而待也。
           
           　　臣本布衣，躬耕於南陽，苟全性命於亂世，不求聞達於諸
          侯。先帝不以臣卑鄙，猥自枉屈，三顧臣於草廬之中，諮臣以
          當世之事，由是感激，遂許先帝以驅馳。後值傾覆，受任於敗
          軍之際，奉命於危難之間，爾來二十有一年矣！先帝知臣謹慎
          ，故臨崩寄臣以大事也。受命以來，夙夜憂勤，恐託付不效，
          以傷先帝之明。故五月渡瀘，深入不毛。今南方已定，兵甲已
          足，當獎率三軍，北定中原，庶竭駑鈍，攘除奸凶，興復漢室
          ，還於舊都；此臣所以報先帝而忠陛下之職分也。至於斟酌損
          益，進盡忠言，則攸之、褘、允之任也。
          　
                願陛下託臣以討賊興復之效；不效，則治臣之罪，以告先
          帝之靈。若無興德之言，則戮允等，以彰其慢。陛下亦宜自課，
          以諮諏善道，察納雅言，深追先帝遺詔，臣不勝受恩感激。
                今當遠離，臨表涕泣，不知所云。`,
          extension: new Map(),
        },
        {
          fieldId: 'f03',
          fieldType: FieldType.LINK,
          fieldVal: 'https://www.google.com.tw',
          extension: new Map(),
        },
        {
          fieldId: 'f04',
          fieldType: FieldType.BGIMG,
          fieldVal: 'https://garden.decoder.com.tw/demo_cms/assets/img/CMS-login-bg.png',
          extension: new Map(),
        },
        {
          fieldId: 'f05',
          fieldType: FieldType.IMG,
          fieldVal: 'http://www.neux.com.tw/neuximg/neuxLOGO.png',
          extension: new Map(),
        },
        {
          fieldId: 'f06',
          fieldType: FieldType.GROUP,
          fieldVal: '',
          extension: new Map(),
        },
        {
          fieldId: 'f07',
          fieldType: FieldType.HTMLEDITOR,
          fieldVal: '<div style="color:red;border:1px solid black; background-color: white; padding:10px"><span>我的自訂</span><span style="color:black;">01</span><div>',
          extension: new Map(),
        }
      ],
      attributes: new Map(),
      toJson: () => ''
    };

    const groupTemplateInfo: GroupTemplateInfo = {
      id: 'gt01',
      templateId: 'Group',
      fields: [],
      attributes: new Map(),
      itemList: [],
      toJson: () => ''
    }

    const mock: ContentInfo = {
      templateList: [
        fieldsDemoTemplateInfo,
        tabTemplateInfo
      ],
      templates: [
        fieldsDemoTemplateInfo,
        tabTemplateInfo
      ],
    } as any;

    return mock as any;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private _setEditorUnsaved() {
    this._saved = false;
  }

  private _setEditorSaved() {
    this._saved = true
  }

  clear() {
    this._setEditorUnsaved();
  }

  close() {
    if (!this._saved) {
      const yes = window.confirm('有尚未儲存的變更，確定關閉？');
      if (!yes) {
        return;
      }
    }
    this.editorClose.emit(this.contentInfoModel);
  }

  save() {
    this.editorSave.emit({
      contentInfo: this.contentInfoModel,
      editorSave: this._setEditorSaved.bind(this),
    });
  }

  selectAddTemplatePosition(event, position = 0) {
    event.stopPropagation();
    this.resetSelected();
    this.layoutControlPanel.setPosition(position);
  }

  undo() {
    this.actionManager.undo();
    this._setEditorUnsaved();
  }

  redo() {
    this.actionManager.redo();
    this._setEditorUnsaved();
  }

  resetSelected() {
    if (this.layoutControlPanel) {
      this.layoutControlPanel.setPosition();
    }
    if (this.contentControlPanel) {
      this.contentControlPanel.setContent();
    }
  }

  onTemplateSelect(event: { template: ContentTemplateInfo, position: number }) {
    this.actionManager.doAction(new AddTemplateAction({
      contentInfo: this.contentInfoModel,
      position: event.position,
      template: event.template,
    }));
    this.resetSelected();
    this._changeDetectorRef.detectChanges();
  }

}
