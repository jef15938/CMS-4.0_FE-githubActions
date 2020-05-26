import { Component, OnInit, Input, OnDestroy, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FarmService } from '../../service/farm.service';
import { FarmInfo, CmsFarmInfoCategory } from '../../type/farm.class';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'cms-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit, OnDestroy {

  @ViewChild('subContainer', { read: ViewContainerRef }) subContainerViewContainerRef: ViewContainerRef;

  @Input() topLevel: string;
  @Input() funcId: string;
  @Input() categoryId: string;
  @Input() isSub = false;

  farm: FarmInfo;

  activedCategory: CmsFarmInfoCategory;

  subComponentRef: ComponentRef<FarmComponent>;

  destroyMe = new Subject();
  private _destroy$ = new Subject();

  constructor(
    private _farmService: FarmService,
    private _componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this._getFarm().subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private _getFarm() {
    return this._farmService.getFarmByFuncID(this.funcId).pipe(
      tap(farm => {
        this.farm = farm;
        this.activedCategory = this.farm?.category[0];
      }),
    )
  }

  destroySelf() {
    this.destroyMe.next();
  }

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.activedCategory = this.farm.category[ev.index];
  }

  createSub() {
    if (!this.activedCategory) { return; }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(FarmComponent);
    const viewContainerRef = this.subContainerViewContainerRef;
    viewContainerRef.clear();
    const subComponentRef = viewContainerRef.createComponent(componentFactory);
    subComponentRef.instance.isSub = true;
    subComponentRef.instance.funcId = this.funcId;
    subComponentRef.instance.topLevel = `${this.topLevel ? this.topLevel + ' > ' : ''}${this.activedCategory.category_name}`;
    // subComponentRef.instance.categoryId = this.farm?.category.ca
    this.subComponentRef = subComponentRef;
    this.subComponentRef.instance.destroyMe.pipe(
      takeUntil(this._destroy$),
      tap(_ => this.destroySub()),
    ).subscribe();
  }

  destroySub() {
    try {
      this.subComponentRef.instance.destroyMe.unsubscribe();
    } catch (error) {
      console.error('destroySub() destroyMe.unsubscribe()', error);
    }
    try {
      this.subComponentRef.destroy();
    } catch (error) {
      console.error('destroySub() subComponentRef.destroy()', error);
    }
    this.subContainerViewContainerRef.clear();
    this.subComponentRef = undefined;
  }

}
