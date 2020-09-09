import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, Input, ComponentRef, ElementRef } from '@angular/core';
import { concat, Subject, of, Observable, NEVER } from 'rxjs';
import { tap, takeUntil, concatMap, map } from 'rxjs/operators';
import { AuthorizationService, GalleryService } from '../../../../../global/api/service';
import { ColDef } from '../../../../ui/table';
import { TreeComponent } from '../../../../ui/tree';
import { ModalService } from '../../../../ui/modal';
import { GalleryCategoryNodeComponent, GalleryCategoryNodeCustomEvent } from '../gallery-category-node/gallery-category-node.component';
import { GalleryCategoryMaintainModalComponent } from '../gallery-category-maintain-modal/gallery-category-maintain-modal.component';
import { UploadGalleryModalComponent } from '../upload-gallery-modal/upload-gallery-modal.component';
import { GalleryActionCellComponent, GalleryActionCellCustomEvent } from '../gallery-action-cell/gallery-action-cell.component';
import { GalleryInfoCellComponent } from '../gallery-info-cell/gallery-info-cell.component';
import { GalleryFileType } from '../../type/gallery-shared.type';
import { GalleryInfoModel } from '../../../../../global/api/data-model/models/gallery-info.model';
import { GalleryCategoryInfoModel } from '../../../../../global/api/data-model/models/gallery-category-info.model';
import { PageInfoModel } from '../../../../../global/api/data-model/models/page-info.model';
import { GalleryConfigResponseModel } from '../../../../../global/api/data-model/models/gallery-config-response.model';
import { CmsErrorHandler } from '../../../../../global/error-handling';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'cms-gallery-shared',
  templateUrl: './gallery-shared.component.html',
  styleUrls: ['./gallery-shared.component.scss']
})
export class GallerySharedComponent implements OnInit, OnDestroy {

  @Input() mode: 'page' | 'modal' = 'page';
  @Input() allowedFileTypes: GalleryFileType[] = [];

  @Output() galleryClick = new EventEmitter<GalleryInfoModel>();

  @ViewChild(TreeComponent) tree: TreeComponent<GalleryCategoryInfoModel>;

  customNodeRenderer = GalleryCategoryNodeComponent;

  categories: GalleryCategoryInfoModel[] = [];
  selectedCategory: GalleryCategoryInfoModel;

  galleryPageInfo: PageInfoModel;
  galleryDatas: GalleryInfoModel[];
  colDefs: ColDef<GalleryInfoModel>[];

  galleryConfig: GalleryConfigResponseModel;

  readonly clipBoardInputId = 'gallerySharedClipBoardInput';

  private destroy$ = new Subject();
  private categorySelected$ = new Subject<GalleryCategoryInfoModel>();

  filterFileTypeOptions: { value: string, display: string }[] = [];
  filter: { fileName: string, fileTypes: string[] } = { fileName: '', fileTypes: [], };

  constructor(
    private galleryService: GalleryService,
    private authorizationService: AuthorizationService,
    private modalService: ModalService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.colDefs = this.createColDefs(this.mode);
    this.filterFileTypeOptions = this.createFilterFileTypeOptions();
    this.filter.fileTypes = this.filterFileTypeOptions.map(option => option.value);

    this.init().subscribe();
    this.getGalleryConfig().subscribe();

    this.categorySelected$.pipe(
      tap(selectedCategory => {
        this.selectedCategory = selectedCategory;
      }),
      takeUntil(this.destroy$),
    ).subscribe(_ => this.getGallery(true).subscribe());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private createColDefs(mode: 'page' | 'modal'): ColDef<GalleryInfoModel>[] {
    const colDefs: ColDef<GalleryInfoModel>[] = [
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
        field: '',
        title: '資訊',
        cellRenderer: GalleryInfoCellComponent,
      },
    ];

    if (this.mode === 'page') {
      colDefs.push({
        colId: 'action',
        field: 'action',
        title: '操作',
        cellRenderer: GalleryActionCellComponent,
        width: '80px',
      });
    }

    return colDefs;
  }

  private createFilterFileTypeOptions(): { value: GalleryFileType, display: string }[] {
    let filterFileTypeOptions: { value: GalleryFileType, display: string }[] = [
      // { value: '', display: '全部', },
      { value: 'pdf', display: 'pdf', },
      { value: 'doc', display: 'doc', },
      { value: 'docx', display: 'docx', },
      { value: 'xls', display: 'xls', },
      { value: 'xlsx', display: 'xlsx', },
      { value: 'png', display: 'png', },
      { value: 'jpg', display: 'jpg', },
      { value: 'jpeg', display: 'jpeg', },
      { value: 'gif', display: 'gif', }
    ];

    if (this.allowedFileTypes?.length) {
      filterFileTypeOptions = filterFileTypeOptions.filter(option => this.allowedFileTypes.indexOf(option.value) > -1);
    }

    return filterFileTypeOptions;
  }

  private init() {
    return concat(
      this.getCategories().pipe(tap(_ => {
        if (this.categories[0]) {
          this.categorySelected$.next(this.categories[0]);
        }
      })),
      this.getGallery(),
    );
  }

  private getCategories() {
    return this.galleryService.getGalleryCategory().pipe(
      CmsErrorHandler.rxHandleError('取得媒體庫分類清單錯誤'),
      tap(categories => this.categories = categories)
    );
  }

  private getGalleryConfig() {
    return this.galleryService.getGalleryConfig().pipe(
      CmsErrorHandler.rxHandleError('取得媒體庫錯誤'),
      tap(config => this.galleryConfig = config),
    );
  }

  getGallery(resetPage = false) {

    if (!this.selectedCategory?.categoryId) {
      this.galleryPageInfo = undefined;
      this.galleryDatas = undefined;
      return of(undefined);
    }

    return this.galleryService.getGalleryByCategoryID(
      this.selectedCategory.categoryId,
      resetPage ? 1 : this.galleryPageInfo?.page,
      this.filter
    ).pipe(
      tap(res => {
        this.galleryPageInfo = res.pageInfo;
        this.galleryDatas = res.datas;
      })
    );
  }

  maintainCategory(action: 'Create' | 'Update', category?: GalleryCategoryInfoModel) {
    return this.modalService.openComponent({
      component: GalleryCategoryMaintainModalComponent,
      componentInitData: {
        action,
        categoryID: action === 'Update' ? category.categoryId : undefined,
        categoryName: action === 'Update' ? category.categoryName : undefined,
        parentId: action === 'Update' ? this.tree.findParent(category)?.categoryId : category?.categoryId,
        assignDeptId: action === 'Update' ? category.assignDeptId : this.authorizationService.getCurrentLoginInfo().deptId,
      }
    });
  }

  uploadFileToCategory(category: GalleryCategoryInfoModel) {
    this.modalService.openComponent({
      component: UploadGalleryModalComponent,
      componentInitData: {
        galleryConfig: this.galleryConfig,
        categoryName: category.categoryName,
        categoryId: category.categoryId,
      }
    }).pipe(
      concatMap(res => res ? this.getGallery() : of(undefined)),
    ).subscribe();
  }

  private updateGallery(gallery: GalleryInfoModel) {
    return this.modalService.openComponent({
      component: UploadGalleryModalComponent,
      componentInitData: {
        galleryConfig: this.galleryConfig,
        galleryId: gallery.galleryId,
        galleryType: gallery.fileType,
        galleryName: gallery.fileName,
      }
    });
  }

  onTreeCustomEvent(event: GalleryCategoryNodeCustomEvent) {
    if (event instanceof GalleryCategoryNodeCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.CREATE:
          action = this.maintainCategory('Create', event.data);
          break;
        case event.ActionType.EDIT:
          action = this.maintainCategory('Update', event.data);
          break;
        case event.ActionType.DELETE:
          action = of(undefined).pipe(
            this.modalService.confirmDelete,
            concatMap(_ => this.galleryService.deleteGalleryCategory(event.data.categoryId).pipe(
              map(res => 'Deleted')
            ))
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
    const input = (this.elementRef.nativeElement as HTMLElement).querySelector(`#${this.clipBoardInputId}`) as HTMLInputElement;
    input.setAttribute('type', 'text');
    input.setAttribute('value', text);
    input.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      input.setAttribute('type', 'hidden');
      this.modalService.openMessage({ message: '複製成功，請直接貼上使用!!' }).subscribe();
    } catch (err) {
      this.modalService.openMessage({ message: '無法複製到剪貼板' }).subscribe();
    }

    /* unselect the range */
    window.getSelection().removeAllRanges();
  }

  onTableCustomEvent(event) {
    if (event instanceof GalleryActionCellCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.EDIT:
          action = this.updateGallery(event.data);
          break;
        case event.ActionType.DELETE:
          action = of(undefined).pipe(
            this.modalService.confirmDelete,
            concatMap(_ => this.galleryService.deleteGallery(event.data.galleryId).pipe(
              map(res => 'Deleted')
            ))
          );
          break;
        case event.ActionType.COPY_URL:
          this.copyToClipBoard(event.data.url);
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

  onNodeSelected(event: { node: GalleryCategoryInfoModel }) {
    this.categorySelected$.next(event?.node);
  }

  onPageChanged(event: { pageIndex: number }) {
    this.galleryPageInfo.page = event.pageIndex + 1;
    this.getGallery().subscribe();
  }

  onRowClick(gallery: GalleryInfoModel) {
    this.galleryClick.emit(gallery);
  }

  onCustomNodeRendererInit = (customRenderComponentRef: ComponentRef<GalleryCategoryNodeComponent>) => {
    customRenderComponentRef.instance.mode = this.mode;
  }

  clearFilterName(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();

    this.filter.fileName = '';
  }

  toggleFilterTypeSelectAll(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();

    const shouldSelectAll = !this.filter?.fileTypes?.length || (this.filter.fileTypes.length !== this.filterFileTypeOptions?.length);
    const newValue = [];
    if (shouldSelectAll) {
      this.filterFileTypeOptions.forEach(option => {
        newValue.push(option.value);
      });
    }
    this.filter.fileTypes = newValue;
  }

}
