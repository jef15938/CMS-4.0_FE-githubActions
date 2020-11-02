import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormService } from '../../../../global/api/service/form/form.service';
import { ListFormTypeInfo } from '../../../../global/api/neuxAPI/bean/ListFormTypeInfo';
import { CustomModalBase } from '../../modal/base/custom-modal-base';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { ListFilesInfoModel } from '../../../../global/api/data-model/models/list-files-info.model';
import { ColDef } from '../../table/table.interface';

@Component({
  selector: 'cms-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent extends CustomModalBase<FormModalComponent, ListFilesInfoModel> implements OnInit, AfterViewInit {
  title: string | (() => string) = '選擇表單下載';

  @ViewChild('select') select: MatSelect;

  @Input() typeID = '';

  types$: Observable<ListFormTypeInfo[]>;
  files$: Observable<ListFilesInfoModel[]>;

  selectedTypeID = '';

  colDefs: ColDef<ListFilesInfoModel>[] = [
    {
      colId: 'galleryId',
      field: 'galleryId',
      title: 'id',
      width: '80px',
    },
    {
      colId: 'name',
      field: 'name',
      title: 'name',
    },
    {
      colId: 'path',
      field: 'path',
      title: 'path',
    },
  ];

  constructor(
    private formService: FormService,
  ) { super(); }

  ngOnInit(): void {
    this.types$ = this.formService.ListFormType().pipe(
      CmsErrorHandler.rxHandleError(),
      map(types => types.filter(type => this.typeID ? type.id === this.typeID : true))
    );
  }

  ngAfterViewInit(): void {
    this.files$ = this.getfiles();
  }

  private getfiles() {
    return this.select.selectionChange.pipe(
      switchMap(_ => {
        if (this.selectedTypeID === 'none') { return of([]); }
        return this.formService.ListFiles(this.selectedTypeID).pipe(
          CmsErrorHandler.rxHandleError((error, showMessage) => {
            showMessage();
            this.files$ = this.getfiles();
          }),
        );
      }),
    );
  }

  onSelect(file: ListFilesInfoModel) {
    this.close(file);
  }

}
