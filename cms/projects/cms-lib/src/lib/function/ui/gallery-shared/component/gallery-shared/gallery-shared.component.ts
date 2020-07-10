import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { concat, Subject, of, Observable, NEVER } from 'rxjs';
import { tap, takeUntil, debounceTime, concatMap, map } from 'rxjs/operators';
import { AuthorizationService, GalleryService } from '../../../../../global/api/service';
import { PageInfo } from '../../../../../global/api/neuxAPI/bean/PageInfo';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { GalleryCategoryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryCategoryInfo';
import { ColDef } from '../../../../ui/table';
import { TreeComponent } from '../../../../ui/tree';
import { ModalService } from '../../../../ui/modal';
import { GalleryCategoryNodeComponent, GalleryCategoryNodeCustomEvent } from '../gallery-category-node/gallery-category-node.component';
import { GalleryCategoryMaintainModalComponent } from '../gallery-category-maintain-modal/gallery-category-maintain-modal.component';
import { UploadGalleryModalComponent } from '../upload-gallery-modal/upload-gallery-modal.component';
import { GalleryActionCellComponent, GalleryActionCellCustomEvent } from '../gallery-action-cell/gallery-action-cell.component';
import { GalleryInfoCellComponent } from '../gallery-info-cell/gallery-info-cell.component';

@Component({
  selector: 'cms-gallery-shared',
  templateUrl: './gallery-shared.component.html',
  styleUrls: ['./gallery-shared.component.scss']
})
export class GallerySharedComponent implements OnInit, OnDestroy {

  @Output() galleryClick = new EventEmitter<GalleryInfo>();

  @ViewChild(TreeComponent) tree: TreeComponent<GalleryCategoryInfo>;

  customNodeRenderer = GalleryCategoryNodeComponent;

  categories: GalleryCategoryInfo[] = [];
  selectedCategory: GalleryCategoryInfo;

  galleryPageInfo: PageInfo;
  galleryDatas: GalleryInfo[];
  colDefs: ColDef[] = [
    // {
    //   colId: 'file_name',
    //   field: 'file_name',
    //   title: '檔名',
    // },
    // {
    //   colId: 'size',
    //   field: 'size',
    //   title: '大小',
    // },
    // {
    //   colId: 'file_type',
    //   field: 'file_type',
    //   title: '類型',
    // },
    {
      colId: 'info',
      field: 'info',
      title: '資訊',
      cellRenderer: GalleryInfoCellComponent,
    },
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: GalleryActionCellComponent,
    }
  ];

  private destroy$ = new Subject();
  private categorySelected$ = new Subject<GalleryCategoryInfo>();

  constructor(
    private galleryService: GalleryService,
    private authorizationService: AuthorizationService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.init().subscribe();

    this.categorySelected$.pipe(
      debounceTime(200),
      takeUntil(this.destroy$),
      tap(selectedCategory => this.selectedCategory = selectedCategory),
      concatMap(_ => this.getGallery()),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private init() {
    return concat(
      this.getCategories(),
      this.getGallery(),
    );
  }

  private getCategories() {
    return this.galleryService.getGalleryCategory().pipe(
      tap(categories => this.categories = categories)
    );
  }

  private getGallery() {

    if (!this.selectedCategory?.category_id) {
      this.galleryPageInfo = undefined;
      this.galleryDatas = undefined;
      return of(undefined);
    }

    return this.galleryService.getGalleryByCategoryID(
      this.selectedCategory.category_id,
      this.galleryPageInfo?.page
    ).pipe(
      tap(res => {
        this.galleryPageInfo = res.pageInfo;
        this.galleryDatas = res.datas;
      })
    );
  }

  private maintainCategory(action: 'Create' | 'Update', category: GalleryCategoryInfo) {
    return this.modalService.openComponent({
      component: GalleryCategoryMaintainModalComponent,
      componentInitData: {
        action,
        categoryID: action === 'Update' ? category.category_id : undefined,
        categoryName: action === 'Update' ? category.category_name : undefined,
        parentId: action === 'Update' ? this.tree.findParent(category)?.category_id : category.category_id,
        assignDeptId: this.authorizationService.getCurrentLoginInfo().dept_id
      }
    });
  }

  private uploadFileToCategory(category: GalleryCategoryInfo) {
    return this.modalService.openComponent({
      component: UploadGalleryModalComponent,
      componentInitData: {
        categoryName: category.category_name,
        categoryId: category.category_id,
      }
    });
  }

  private updateGallery(galleryId: number) {
    return this.modalService.openComponent({
      component: UploadGalleryModalComponent,
      componentInitData: {
        galleryId,
      }
    });
  }

  onTreeCustomEvent(event: GalleryCategoryNodeCustomEvent) {
    if (event instanceof GalleryCategoryNodeCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.Upload:
          action = this.uploadFileToCategory(event.data);
          break;
        case event.ActionType.Create:
          action = this.maintainCategory('Create', event.data);
          break;
        case event.ActionType.Edit:
          action = this.maintainCategory('Update', event.data);
          break;
        case event.ActionType.Delete:
          action = this.galleryService.deleteGalleryCategory(event.data.category_id).pipe(
            map(_ => 'Deleted')
          );
          break;
      }

      if (action) {
        action.pipe(
          concatMap(res => res ? this.init() : of(undefined)),
        ).subscribe();
      }
    }
  }

  copyToClipBoard(text: string) {
    const input = document.getElementById('clipBoardInput') as HTMLInputElement;
    input.setAttribute('type', 'text');
    input.setAttribute('value', text);
    input.select();
    try {
      console.warn('input.value = ', input.value);
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      input.setAttribute('type', 'hidden');
      alert('Testing code was copied ' + msg);
    } catch (err) {
      alert('Oops, unable to copy');
    }

    /* unselect the range */
    window.getSelection().removeAllRanges();
  }

  onTableCustomEvent(event) {
    if (event instanceof GalleryActionCellCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.Edit:
          action = this.updateGallery(event.data.gallery_id);
          break;
        case event.ActionType.Delete:
          action = this.galleryService.deleteGallery(event.data.gallery_id).pipe(
            map(_ => 'Deleted')
          );
          break;
        case event.ActionType.CopyUrl:
          this.copyToClipBoard(`${this.galleryService.getGalleryShowUrlByGalleryID(event.data.gallery_id)}`);
          action = NEVER;
          break;
      }

      if (action) {
        action.pipe(
          concatMap(res => res ? this.getGallery() : of(undefined)),
        ).subscribe();
      }
    }
  }

  onNodeSelected(event: { node: GalleryCategoryInfo }) {
    this.categorySelected$.next(event?.node);
  }

  onPageChanged(event: { pageIndex: number }) {
    this.galleryPageInfo.page = event.pageIndex + 1;
    this.getGallery().subscribe();
  }

  onRowClick(gallery: GalleryInfo) {
    this.galleryClick.emit(gallery);
  }

}
