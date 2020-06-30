import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { CmsFarmFormInfo } from './../../../../../global/model';
import { FarmFormComp } from '../../farm.interface';
import { FarmFormInfoComponent } from '../farm-form-info/farm-form-info.component';

@Component({
  selector: 'cms-farm-search-info',
  templateUrl: './farm-search-info.component.html',
  styleUrls: ['./farm-search-info.component.scss']
})
export class FarmSearchInfoComponent implements OnInit, AfterContentChecked, OnDestroy {

  @ViewChild(FarmFormInfoComponent) farmFormInfoComponent: FarmFormInfoComponent;

  @Input() searchInfo: CmsFarmFormInfo;

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
