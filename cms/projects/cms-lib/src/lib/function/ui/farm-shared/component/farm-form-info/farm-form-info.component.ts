import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { CmsValidator, CmsFormValidator } from './../../../../../global/util';
import { FarmFormComp } from '../../farm-shared.interface';
import { ContentEditorService } from './../../../content-editor';
import { FarmService } from '../../../../../global/api/service';
import { HtmlEditorService } from '../../../html-editor';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { CmsDateAdapter } from '../../../../../global/util/mat-date/mat-date';
import { ContentInfo } from '../../../../../global/api/neuxAPI/bean/ContentInfo';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GetFarmTreeResponseModel } from '../../../../../global/api/data-model/models/get-farm-tree-response.model';
import { FarmTreeInfoModel } from '../../../../../global/api/data-model/models/farm-tree-info.model';
import { FarmFormInfoModel, FarmFormInfoModelColumn, FarmFormInfoColumnDisplayType, FarmFormInfoColumnTriggerType } from '../../../../../global/api/data-model/models/farm-form-info.model';
import { GalleryFileType } from '../../../gallery-shared/type/gallery-shared.type';
import { CmsErrorHandler } from '../../../../../global/error-handling';

interface FormColumnSetting {
  enable: boolean;
  readonly: boolean;
  required: boolean;
}

@Component({
  selector: 'cms-farm-form-info',
  templateUrl: './farm-form-info.component.html',
  styleUrls: ['./farm-form-info.component.scss']
})
export class FarmFormInfoComponent implements FarmFormComp, OnInit {

  FarmFormInfoColumnDisplayType = FarmFormInfoColumnDisplayType;

  @Input() farmFormInfo: FarmFormInfoModel;
  @Input() useValidation = false;
  @Input() funcID = '';
  @Input() mode: 'preview' | 'edit' = 'preview';

  formGroup: FormGroup;
  formColumnSettingMap: Map<string, FormColumnSetting>;

  treeMap: Map<string, GetFarmTreeResponseModel> = new Map();
  treeNodeSelectedMap: Map<string, FarmTreeInfoModel[]> = new Map();

  constructor(
    private contentEditorService: ContentEditorService,
    private htmlEditorService: HtmlEditorService,
    private gallerySharedService: GallerySharedService,
    private farmService: FarmService,
    private cmsDateAdapter: CmsDateAdapter,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup(this.farmFormInfo);
    this.formColumnSettingMap = this.createFormColumnSettingMap(this.farmFormInfo);
    this.farmFormInfo.columns.forEach(column => {
      this.checkColumnTrigger(column);
      if (column.displayType === FarmFormInfoColumnDisplayType.TREE) {
        this.farmService.getFarmTree(column.setting.treeSource)
          .pipe(CmsErrorHandler.rxHandleError(`取得${column.displayText}欄位資料來源錯誤`))
          .subscribe(tree => {
            const idStrings = (column.value || '') as string;
            const ids = idStrings.split(',').filter(id => !!id);
            const selectedNode: FarmTreeInfoModel[] = this.getFarmTreeInfosByTreeIds(ids, tree.data);
            this.treeNodeSelectedMap.set(column.columnId, selectedNode);
            this.treeMap.set(column.columnId, tree);
          });
      }
    });
  }

  private createFormGroup(farmFormInfo: FarmFormInfoModel): FormGroup {
    const formGroup = new FormGroup({});
    const rangeValidatorFns: ValidatorFn[] = [];
    farmFormInfo.columns.forEach((column, index) => {
      // parse DATE & DATETIME
      let value: any = column.value;
      if (
        column.displayType === FarmFormInfoColumnDisplayType.DATE
        || column.displayType === FarmFormInfoColumnDisplayType.DATETIME
      ) {
        value = this.cmsDateAdapter.convertDateStringToDate(value);
      } else if (column.displayType === FarmFormInfoColumnDisplayType.LABEL) {
        value = this.cmsDateAdapter.convertDateString(value, FarmFormInfoColumnDisplayType.DATETIME);
      }

      // create FormControl
      const formControl = new FormControl(value);
      if (this.useValidation && farmFormInfo.validation) {
        const validatorFns: ValidatorFn[] = [];
        const validation = farmFormInfo.validation;
        // required
        const required = validation.required?.find(col => col === column.columnId);
        if (required) {
          validatorFns.push((control: AbstractControl) => {
            if (!CmsValidator.hasValue(control.value)) {
              return {
                required: '必填欄位'
              };
            }
            return null;
          });
        }
        // email
        const email = validation.email?.find(col => col === column.columnId);
        if (email) {
          validatorFns.push((control: AbstractControl) => {
            return Validators.email(control) ? {
              email: '非正確email格式'
            } : null;
          });
        }
        // alphanumeric TODO: 等 api 改為 regex
        const alphanumeric = validation.alphanumeric?.find(col => col === column.columnId);
        if (alphanumeric) {
          validatorFns.push((control: AbstractControl) => {
            return null;
          });
        }
        // number
        const num = validation.number?.find(col => col === column.columnId);
        if (num) {
          validatorFns.push((control: AbstractControl) => {
            if (!CmsValidator.isNumber(control.value)) {
              return {
                number: '必須是數字'
              };
            }
            return null;
          });
        }

        if (validatorFns.length) {
          formControl.setValidators(validatorFns);
        }
      }
      formGroup.addControl(column.columnId, formControl);
    });

    // range
    if (this.useValidation && farmFormInfo.validation) {
      farmFormInfo.validation.range.forEach(r => {
        rangeValidatorFns.push(
          CmsFormValidator.startTimeEndTime(r.startColumn, r.endColumn),
        );
      });
    }
    formGroup.setValidators(rangeValidatorFns);

    return formGroup;
  }

  private createFormColumnSettingMap(farmFormInfo: FarmFormInfoModel): Map<string, FormColumnSetting> {
    const map = new Map<string, FormColumnSetting>();
    farmFormInfo?.columns?.forEach(column => {
      map.set(column.columnId, { required: false, readonly: false, enable: true, });
    });
    return map;
  }

  private getFarmTreeInfosByTreeIds(funcIds: string[], sources: FarmTreeInfoModel[], results: FarmTreeInfoModel[] = [])
    : FarmTreeInfoModel[] {
    if (!sources?.length) { return results; }
    results = results.concat(sources.filter(source => funcIds.indexOf(source.id) > -1));
    sources = sources.reduce((a, b) => a.concat(b.children || []), []);
    return this.getFarmTreeInfosByTreeIds(funcIds, sources, results);
  }

  clearForm() {
    // TODO: 清除時怎麼帶預設值 ?
    this.formGroup.reset();
  }

  requestFormInfo(): Observable<FarmFormInfoModel> {
    try {
      const formGroup = this.formGroup;

      for (const controlName of Object.keys(formGroup.controls)) {
        const control = formGroup.controls[controlName];
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }

      const info: FarmFormInfoModel = JSON.parse(JSON.stringify(this.farmFormInfo));
      info.columns.forEach(col => {
        let value = formGroup.controls[col.columnId]?.value;
        if (
          col.displayType === FarmFormInfoColumnDisplayType.DATE
          || col.displayType === FarmFormInfoColumnDisplayType.DATETIME
        ) {
          value = this.cmsDateAdapter.convertDateToDateString(value, col.displayType);
        }
        col.value = value;
      });

      if (!this.useValidation) { return of(info); }

      if (!formGroup.valid) { return throwError('Form is not valid.'); }
      return of(info);
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'FarmFormInfoComponent.requestFormInfo()', '處理表單資料錯誤');
      return null;
    }
  }

  checkColumnTrigger(column: FarmFormInfoModelColumn) {
    const triggers = column?.triggers;
    if (!triggers?.length) { return; }
    triggers.forEach(trigger => {
      const affectedColumns = trigger.triggerTarget; // 受影響的所有 column
      if (trigger.triggerType === FarmFormInfoColumnTriggerType.DATATRIGGER) {
        const triggerID = trigger.triggerSetting.triggerId;
        this.farmService.listFarmTriggerData(triggerID)
          .pipe(CmsErrorHandler.rxHandleError(`取得${column.displayText}欄位trigger資料錯誤`))
          .subscribe(options => {
            trigger.triggerTarget.forEach(target => {
              const targetColumnSetting = this.farmFormInfo.columns.find(c => c.columnId === target)?.setting;
              if (targetColumnSetting) { targetColumnSetting.options = options; }
            });
          });
      } else {
        const columnValue = this.formGroup?.get(column.columnId).value;
        const triggeredColumn = trigger.triggerSetting[columnValue]; // 當前 trigger 的 column
        affectedColumns.forEach(affectedColumn => {
          const columnSetting = this.formColumnSettingMap.get(affectedColumn);

          switch (trigger.triggerType) {
            case FarmFormInfoColumnTriggerType.ENABLETRIGGER:
              affectedColumn === triggeredColumn
                ? columnSetting.enable = true
                : columnSetting.enable = false;
              break;
            case FarmFormInfoColumnTriggerType.READONLYTRIGGER:
              affectedColumn === triggeredColumn
                ? columnSetting.readonly = true
                : columnSetting.readonly = false;
              break;
            case FarmFormInfoColumnTriggerType.REQUIREDTRIGGER:
              affectedColumn === triggeredColumn
                ? columnSetting.required = true
                : columnSetting.required = false;
              break;
          }
        });
      }
    });
  }

  openContentEditor(col: FarmFormInfoModelColumn) {
    try {
      const controlID = this.funcID;
      const control = this.formGroup.get(col.columnId);

      const content = JSON.parse((control.value) as string) as ContentInfo;
      if (this.mode === 'preview') {
        this.contentEditorService.openEditorPreview(content, controlID).subscribe();
      } else {
        this.contentEditorService.openEditorByContent(content, controlID).subscribe(result => {
          control.setValue(JSON.stringify(result));
        });
      }
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'FarmFormInfoComponent.openContentEditor()', '開啟編輯器資料處理錯誤');
    }
  }

  openHtmlEditor(col: FarmFormInfoModelColumn) {
    this.htmlEditorService.openEditor({
      // title: `Html編輯`,
      content: col.value
    }).subscribe(content => {
      if (content || content === '') {
        this.formGroup.get(col.columnId).setValue(content);
      }
    });
  }

  changeGallery(col: FarmFormInfoModelColumn) {
    const limitFileNameExt = col.setting.limitFileNameExt;
    this.gallerySharedService.openGallery(
      limitFileNameExt ? (limitFileNameExt.split(',').map(ext => ext.toLowerCase()) as GalleryFileType[]) : undefined
    ).subscribe(selectedGallery => {
      if (selectedGallery) {
        this.formGroup.get(col.columnId).setValue(`${selectedGallery.galleryId}`);
        col.setting.fileName = selectedGallery.fileName;
      }
    });
  }

  onNodesCheckedChange(ev: { nodes: FarmTreeInfoModel[] }, columnID: string) {
    const ids = ev.nodes.map(node => node.id);
    this.formGroup.get(columnID).setValue(ids.length ? ids.join(',') : '');
  }

  onCheckboxChange(ev: MatCheckboxChange, col: FarmFormInfoModelColumn, option: { text: string, value: string }) {
    const control = this.formGroup.get(col.columnId);
    const controlValue = (control.value || '') as string;
    const values = controlValue ? [...new Set(controlValue.split(','))] : [];
    const index = values.indexOf(option.value);
    if (index > -1) { values.splice(index, 1); }
    if (ev.checked) { values.push(option.value); }

    control.setValue(values.join(','));
    control.updateValueAndValidity();
  }

}
