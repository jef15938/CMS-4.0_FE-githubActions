import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FarmFormInfoComponent } from '../farm-form-info/farm-form-info.component';
import { FarmFormInfoModel } from '../../../../../global/api/data-model/models/farm-form-info.model';

@Component({
  selector: 'cms-farm-search-info',
  templateUrl: './farm-search-info.component.html',
  styleUrls: ['./farm-search-info.component.scss']
})
export class FarmSearchInfoComponent implements OnInit, AfterContentChecked {

  @ViewChild(FarmFormInfoComponent) farmFormInfoComponent: FarmFormInfoComponent;

  @Input() funcID = '';
  @Input() searchInfo: FarmFormInfoModel;

  @Output() needQuery = new EventEmitter<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  getFormInfo() {
    return this.farmFormInfoComponent.getFormInfo();
  }

  query() {
    this.needQuery.emit();
  }

  clear() {
    this.farmFormInfoComponent.clearForm();
    this.needQuery.emit();
  }

}
