import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { CmsFarmFormInfo, CmsFarmFormColumn } from './../../../../../global/model';
import { CmsFarmFormColumnDisplayType, CmsFarmFormColumnTriggerType } from './../../../../../global/enum';
import { CmsValidator, CmsFormValidator } from './../../../../../global/util';
import { FarmFormComp } from '../../farm-shared.interface';
import { ContentEditorService } from './../../../content-editor';
import { FarmService } from '../../../../../global/api/service';
import { HtmlEditorService } from '../../../html-editor';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { CmsDateAdapter } from '../../../../../global/util/mat-date/mat-date';
import { GetFarmTreeResponse } from '../../../../../global/api/neuxAPI/bean/GetFarmTreeResponse';
import { ContentInfo } from '../../../../../global/api/neuxAPI/bean/ContentInfo';

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

  CmsFarmFormColumnDisplayType = CmsFarmFormColumnDisplayType;

  @Input() farmFormInfo: CmsFarmFormInfo;
  @Input() useValidation = false;
  @Input() funcID = '';

  formGroup: FormGroup;
  formColumnSettingMap: Map<string, FormColumnSetting>;

  treeMap: Map<string, GetFarmTreeResponse> = new Map();

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
      if (column.display_type === CmsFarmFormColumnDisplayType.TREE) {
        this.farmService.getFarmTree(column.setting.tree_source).subscribe(tree => this.treeMap.set(column.column_id, tree));
      }
    });
  }

  private createFormGroup(farmFormInfo: CmsFarmFormInfo): FormGroup {
    const formGroup = new FormGroup({});
    const rangeValidatorFns: ValidatorFn[] = [];
    farmFormInfo.columns.forEach((column, index) => {
      // parse DATE & DATETIME
      let value: any = column.value;
      if (column.display_type === CmsFarmFormColumnDisplayType.DATE) {
        value = this.cmsDateAdapter.convertDateStringToDate(value);
      } else if (column.display_type === CmsFarmFormColumnDisplayType.DATETIME) {
        value = this.cmsDateAdapter.convertDateStringToDate(value);
      } else if (column.display_type === CmsFarmFormColumnDisplayType.LABEL) {
        value = this.cmsDateAdapter.convertDateString(value, CmsFarmFormColumnDisplayType.DATETIME);
      }

      // create FormControl
      const formControl = new FormControl(value);
      if (this.useValidation && farmFormInfo.validation) {
        const validatorFns: ValidatorFn[] = [];
        const validation = farmFormInfo.validation;
        // required
        const required = validation.required?.find(col => col === column.column_id);
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
        const email = validation.email?.find(col => col === column.column_id);
        if (email) {
          validatorFns.push((control: AbstractControl) => {
            return Validators.email(control) ? {
              email: '非正確email格式'
            } : null;
          });
        }
        // alphanumeric TODO: 等 api 改為 regex
        const alphanumeric = validation.alphanumeric?.find(col => col === column.column_id);
        if (alphanumeric) {
          validatorFns.push((control: AbstractControl) => {
            return null;
          });
        }
        // number
        const num = validation.number?.find(col => col === column.column_id);
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
      formGroup.addControl(column.column_id, formControl);
    });

    // range
    if (this.useValidation && farmFormInfo.validation) {
      farmFormInfo.validation.range.forEach(r => {
        rangeValidatorFns.push(
          CmsFormValidator.startTimeEndTime(r.start_column, r.end_column),
        );
      });
    }
    formGroup.setValidators(rangeValidatorFns);

    return formGroup;
  }

  private createFormColumnSettingMap(farmFormInfo: CmsFarmFormInfo): Map<string, FormColumnSetting> {
    const map = new Map<string, FormColumnSetting>();
    farmFormInfo?.columns?.forEach(column => {
      map.set(column.column_id, { required: false, readonly: false, enable: true, });
    });
    return map;
  }

  clearForm() {
    // TODO: 清除時怎麼帶預設值 ?
    this.formGroup.reset();
  }

  requestFormInfo(): Observable<CmsFarmFormInfo> {
    const formGroup = this.formGroup;

    for (const controlName of Object.keys(formGroup.controls)) {
      const control = formGroup.controls[controlName];
      control.markAsDirty({ onlySelf: true });
      control.markAsTouched({ onlySelf: true });
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }

    const info: CmsFarmFormInfo = JSON.parse(JSON.stringify(this.farmFormInfo));
    info.columns.forEach(col => {
      let value = formGroup.controls[col.column_id]?.value;
      if (
        col.display_type === CmsFarmFormColumnDisplayType.DATE
        || col.display_type === CmsFarmFormColumnDisplayType.DATETIME
      ) {
        value = this.cmsDateAdapter.convertDateToDateString(value, col.display_type);
      }
      col.value = value;
    });

    if (!this.useValidation) { return of(info); }

    if (!formGroup.valid) { return throwError('Form is not valid.'); }
    return of(info);
  }

  checkColumnTrigger(column: CmsFarmFormColumn) {
    const triggers = column?.triggers;
    if (!triggers?.length) { return; }
    triggers.forEach(trigger => {
      const affectedColumns = trigger.trigger_target; // 受影響的所有 column
      if (trigger.trigger_type === CmsFarmFormColumnTriggerType.DATATRIGGER) {
        const triggerID = trigger.trigger_setting.triggerId;
        this.farmService.listFarmTriggerData(triggerID).subscribe(options => {
          trigger.trigger_target.forEach(target => {
            const targetColumnSetting = this.farmFormInfo.columns.find(c => c.column_id === target)?.setting;
            if (targetColumnSetting) { targetColumnSetting.options = options; }
          });
        });
      } else {
        const columnValue = this.formGroup?.get(column.column_id).value;
        const triggeredColumn = trigger.trigger_setting[columnValue]; // 當前 trigger 的 column
        affectedColumns.forEach(affectedColumn => {
          const columnSetting = this.formColumnSettingMap.get(affectedColumn);

          switch (trigger.trigger_type) {
            case CmsFarmFormColumnTriggerType.ENABLETRIGGER:
              affectedColumn === triggeredColumn
                ? columnSetting.enable = true
                : columnSetting.enable = false;
              break;
            case CmsFarmFormColumnTriggerType.READONLYTRIGGER:
              affectedColumn === triggeredColumn
                ? columnSetting.readonly = true
                : columnSetting.readonly = false;
              break;
            case CmsFarmFormColumnTriggerType.REQUIREDTRIGGER:
              affectedColumn === triggeredColumn
                ? columnSetting.required = true
                : columnSetting.required = false;
              break;
          }
        });
      }
    });
  }

  openContentEditor(column: CmsFarmFormColumn) {
    const controlID = this.funcID;
    const content = (column.value) as ContentInfo;
    // TODO: Farm.EDITOR
    this.contentEditorService.openEditorByContent(content, controlID).subscribe();
  }

  openHtmlEditor(col: CmsFarmFormColumn) {
    this.htmlEditorService.openEditor({
      // title: `Html編輯`,
      content: col.value
    }).subscribe(content => {
      if (content || content === '') {
        this.formGroup.get(col.column_id).setValue(content);
      }
    });
  }

  changeGallery(col: CmsFarmFormColumn) {
    this.gallerySharedService.openGallery().subscribe((selectedGallery: GalleryInfo) => {
      if (selectedGallery) {
        this.formGroup.get(col.column_id).setValue(`${selectedGallery.gallery_id}`);
        col.setting.file_name = selectedGallery.file_name;
      }
    });
  }

  onNodeCheckedChange(ev: { nodes: any[] }) {
    // TODO: FarmFormTree
    console.warn('onNodeCheckedChange() ev = ', ev);
  }

}
