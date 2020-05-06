import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GalleryCategoryInfo } from '../../../neuxAPI/bean/GalleryCategoryInfo';
import { GalleryService } from '../../../service/gallery.service';
import { GalleryCategoryNodeComponent, GalleryCategoryNodeCustomEvent } from './component/node/gallery-category-node/gallery-category-node.component';
import { concat, Subject, of, Observable } from 'rxjs';
import { tap, takeUntil, debounceTime, concatMap } from 'rxjs/operators';
import { PageInfo } from '../../../neuxAPI/bean/PageInfo';
import { GalleryInfo } from '../../../neuxAPI/bean/GalleryInfo';
import { ColDef } from '../../../ui/table/table.interface';
import { ModalService } from '../../../ui/modal/modal.service';
import { GalleryCategoryMaintainModalComponent } from './component/modal/gallery-category-maintain-modal/gallery-category-maintain-modal.component';
import { TreeComponent } from '../../../ui/tree/tree.component';

@Component({
  selector: 'cms-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  @ViewChild(TreeComponent) tree: TreeComponent<GalleryCategoryInfo>

  customNodeRenderer = GalleryCategoryNodeComponent;

  categories: GalleryCategoryInfo[] = [];
  selectedCategory: GalleryCategoryInfo;

  galleryPageInfo: PageInfo;
  galleryDatas: GalleryInfo[];
  colDefs: ColDef[] = [
    {
      colId: 'file_name',
      field: 'file_name',
      title: '檔名',
    },
    {
      colId: 'size',
      field: 'size',
      title: '大小',
    },
    {
      colId: 'file_type',
      field: 'file_type',
      title: '類型',
    },
    // {
    //   colId: 'action',
    //   field: 'action',
    //   title: '操作',
    //   cellRenderer: AuditingActionCellComponent,
    // }
  ];

  private _destroy$ = new Subject();
  private _categorySelected$ = new Subject<GalleryCategoryInfo>();

  constructor(
    private _galleryService: GalleryService,
    private _modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this._init().subscribe();

    this._categorySelected$.pipe(
      debounceTime(300),
      takeUntil(this._destroy$),
      tap(selectedCategory => this.selectedCategory = selectedCategory),
      concatMap(_ => this._getGallery()),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private _init() {
    return concat(
      this._getCategories()
    )
  }

  private _getCategories() {
    return this._galleryService.getGalleryCategory().pipe(
      tap(categories => this.categories = categories)
    );
  }

  private _getGallery() {
    if (!this.selectedCategory?.category_id) { return of(undefined); }
    return this._galleryService.getGalleryByCategoryID(
      this.selectedCategory.category_id,
      this.galleryPageInfo?.page
    ).pipe(
      tap(res => {
        this.galleryPageInfo = res.pageInfo;
        this.galleryDatas = res.datas;
      })
    )
  }

  private _maintainCategory(action: 'Create' | 'Update', category: GalleryCategoryInfo) {
    return this._modalService.openComponent({
      component: GalleryCategoryMaintainModalComponent,
      componentInitData: {
        action,
        categoryID: action === 'Update' ? category.category_id : undefined,
        category_name: action === 'Update' ? category.category_name : undefined,
        parent_id: action === 'Update' ? this.tree.findParent(category)?.category_id : category.category_id,
        assign_dept_id: null
      }
    })
  }

  onTreeCustomEvent(event: GalleryCategoryNodeCustomEvent) {
    if (event instanceof GalleryCategoryNodeCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.Create:
          action = this._maintainCategory('Create', event.data);
          break;
        case event.ActionType.Edit:
          action = this._maintainCategory('Update', event.data);
          break;
        case event.ActionType.Delete:
          action = this._galleryService.deleteGalleryCategory(event.data.category_id);
          break;
      }
      action ? action.subscribe() : null;
    }
  }

  onTableCustomEvent(event) {
    console.warn('onTableCustomEvent()', event);
  }

  onNodeSelected(event: { node: GalleryCategoryInfo }) {
    this._categorySelected$.next(event?.node);
  }

  onPageChanged(event: { pageIndex: number }) {
    this.galleryPageInfo.page = event.pageIndex + 1;
    this._getGallery().subscribe();
  }

}
