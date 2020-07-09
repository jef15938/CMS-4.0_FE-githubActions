import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Observable, throwError, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CmsFarmFormInfo, CmsFarmFormColumn } from './../../../../../global/model';
import { CmsFarmFormColumnDisplayType } from './../../../../../global/enum';
import { CmsValidator, CmsFormValidator } from './../../../../../global/util';
import { FarmFormComp } from '../../farm.interface';
import { ContentEditorService, EditorMode } from './../../../content-editor';
import { ContentService } from '../../../../../global/api/service';
import { ContentInfo } from '../../../../../global/api/neuxAPI/bean/ContentInfo';
import { HtmlEditorService } from '../../../html-editor';

@Component({
  selector: 'cms-farm-form-info',
  templateUrl: './farm-form-info.component.html',
  styleUrls: ['./farm-form-info.component.scss']
})
export class FarmFormInfoComponent implements FarmFormComp, OnInit {

  CmsFarmFormColumnDisplayType = CmsFarmFormColumnDisplayType;

  @Input() farmFormInfo: CmsFarmFormInfo;
  @Input() useValidation = false;

  rows: CmsFarmFormColumn[][];
  formGroup: FormGroup;

  columnTrigger = new Subject<CmsFarmFormColumn>();

  constructor(
    private contentService: ContentService,
    private contentEditorService: ContentEditorService,
    private htmlEditorService: HtmlEditorService,
  ) { }

  ngOnInit(): void {
    this.rows = this.createRows(this.farmFormInfo);
    this.formGroup = this.createFormGroup(this.farmFormInfo);

    // this.columnTrigger.pipe(
    //   debounceTime(300)
    // ).subscribe(col => this.checkColumnTrigger(col));
  }

  private createRows(farmFormInfo: CmsFarmFormInfo): CmsFarmFormColumn[][] {
    const split_size = farmFormInfo.split_size;

    let rowCounts = farmFormInfo.columns.length / split_size;
    const floor = Math.floor(rowCounts);
    rowCounts = rowCounts > floor ? floor + 1 : rowCounts;

    const rows: CmsFarmFormColumn[][] = [];
    for (let i = 0, l = rowCounts; i < l; ++i) {
      const min = i * split_size;
      const max = min + split_size;
      const columnsInRow = farmFormInfo.columns.filter((_, index) => index >= min && index < max);
      rows.push(columnsInRow);
    }

    return rows;
  }

  private createFormGroup(farmFormInfo: CmsFarmFormInfo): FormGroup {
    const formGroup = new FormGroup({});
    const rangeValidatorFns: ValidatorFn[] = [];
    farmFormInfo.columns.forEach((column, index) => {
      const formControl = new FormControl(
        column.display_type !== CmsFarmFormColumnDisplayType.DATE
          ? column.value
          : this.convertStringToDate(column.value)
      );
      if (this.useValidation && farmFormInfo.validation) {
        const validatorFns: ValidatorFn[] = [];
        const validation = farmFormInfo.validation;
        // required
        const required = validation.required?.find(col => col.id === column.column_id);
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
        const email = validation.email?.find(col => col.id === column.column_id);
        if (email) {
          validatorFns.push((control: AbstractControl) => {
            return Validators.email(control) ? {
              email: '非正確email格式'
            } : null;
          });
        }
        // alphanumeric TODO: 等 api 改為 regex
        const alphanumeric = validation.alphanumeric?.find(col => col.id === column.column_id);
        if (alphanumeric) {
          validatorFns.push((control: AbstractControl) => {
            return null;
          });
        }
        // number
        const num = validation.number?.find(col => col.id === column.column_id);
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
      const value = formGroup.controls[col.column_id]?.value;
      col.value = col.display_type !== CmsFarmFormColumnDisplayType.DATE
        ? value
        : this.convertDateToString(value);
    });

    if (!this.useValidation) { return of(info); }

    if (!formGroup.valid) { return throwError('Form is not valid.'); }

    return of(info);
  }

  private convertDateToString(date: Date) {
    if (!date) { return ''; }
    return `${date.getTime() / 1000}`;
  }

  private convertStringToDate(str: string) {
    if (!str) { return null; }
    return new Date(+str * 1000); // 1588635072000
  }

  private checkColumnTrigger(column: CmsFarmFormColumn) {
    const triggers = column?.triggers;
    if (triggers) {
      // TODO:

    }
  }

  openContentEditor(column: CmsFarmFormColumn) {
    const contentInfo = JSON.parse(column.value);
    const controlId = 'farm-control-id';
    this.contentService.getTemplateByControlID(controlId).subscribe(selectableTemplates => {
      this.contentEditorService.openEditor({
        contentInfo,
        selectableTemplates,
        mode: EditorMode.EDIT,
      }).subscribe((res: ContentInfo) => {
        column.value = res ? JSON.stringify(res) : '';
      });
    });
  }

  openHtmlEditor(column: CmsFarmFormColumn) {
    this.htmlEditorService.openEditor({
      // title: `Html編輯`,
      content: column.value
    }).subscribe(content => {
      if (content || content === '') {
        column.value = content;
      }
    });
  }

}
