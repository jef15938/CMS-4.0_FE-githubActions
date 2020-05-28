import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CmsFarmFormInfo } from 'projects/cms-lib/src/lib/type/farm.class';
import { FarmFormInfoComponent } from '../farm-form-info/farm-form-info.component';
import { FarmFormComp } from '../../farm.interface';

@Component({
  selector: 'cms-farm-search-info',
  templateUrl: './farm-search-info.component.html',
  styleUrls: ['./farm-search-info.component.scss']
})
export class FarmSearchInfoComponent implements OnInit, OnDestroy {

  @ViewChild(FarmFormInfoComponent) farmFormInfoComponent: FarmFormInfoComponent;

  @Input() searchInfo: CmsFarmFormInfo;

  @Output() farmFormInfoCompEmit = new EventEmitter<FarmFormComp>();

  @Output() needQuery = new EventEmitter<void>();

  private _intersectionObserver: IntersectionObserver;

  constructor(
    private _elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    let options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    this._intersectionObserver = new IntersectionObserver((entries, observer) => {
      this.farmFormInfoCompEmit.emit(this.farmFormInfoComponent);
    }, options);

    this._intersectionObserver.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._intersectionObserver.unobserve(this._elementRef.nativeElement);
    this._intersectionObserver.disconnect();
  }

  query() {
    this.needQuery.emit();
  }

  clear() {
    this.needQuery.emit();
  }

}
