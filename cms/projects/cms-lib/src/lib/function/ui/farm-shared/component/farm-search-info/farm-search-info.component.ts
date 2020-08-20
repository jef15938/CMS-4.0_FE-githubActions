import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FarmFormComp } from '../../farm-shared.interface';
import { FarmFormInfoComponent } from '../farm-form-info/farm-form-info.component';
import { FarmFormInfoModel } from '../../../../../global/api/data-model/models/farm-form-info.model';

@Component({
  selector: 'cms-farm-search-info',
  templateUrl: './farm-search-info.component.html',
  styleUrls: ['./farm-search-info.component.scss']
})
export class FarmSearchInfoComponent implements OnInit, AfterContentChecked, OnDestroy {

  @ViewChild(FarmFormInfoComponent) farmFormInfoComponent: FarmFormInfoComponent;

  @Input() funcID = '';
  @Input() searchInfo: FarmFormInfoModel;

  @Output() farmFormInfoCompEmit = new EventEmitter<FarmFormComp>();

  @Output() needQuery = new EventEmitter<void>();

  private intersectionObserver: IntersectionObserver;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    };

    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      this.farmFormInfoCompEmit.emit(this.farmFormInfoComponent);
    }, options);
    // tslint:disable-next-line: no-string-literal
    this.intersectionObserver['USE_MUTATION_OBSERVER'] = false;
    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.intersectionObserver.unobserve(this.elementRef.nativeElement);
    this.intersectionObserver.disconnect();
  }

  query() {
    this.needQuery.emit();
  }

  clear() {
    this.farmFormInfoComponent.clearForm();
    this.needQuery.emit();
  }

}
