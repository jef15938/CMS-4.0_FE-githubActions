import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, Input, ComponentRef, ElementRef } from '@angular/core';
import { concat, Subject, of, Observable, NEVER } from 'rxjs';
import { tap, takeUntil, concatMap, map } from 'rxjs/operators';
import { AuthorizationService, GalleryService } from '../../../../../global/api/service';
import { PageInfo } from '../../../../../global/api/neuxAPI/bean/PageInfo';
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

  galleryPageInfo: PageInfo;
  galleryDatas: GalleryInfoModel[];
  colDefs: ColDef<GalleryInfoModel>[];

  readonly clipBoardInputId = 'gallerySharedClipBoardInput';

  private destroy$ = new Subject();
  private categorySelected$ = new Subject<GalleryCategoryInfoModel>();

  filterFileTypeOptions: { value: string, display: string }[] = [];
  filter: { fileName: string, fileType: string } = { fileName: '', fileType: '', };

  constructor(
    private galleryService: GalleryService,
    private authorizationService: AuthorizationService,
    private modalService: ModalService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.colDefs = this.createColDefs(this.mode);
    this.filterFileTypeOptions = this.createFilterFileTypeOptions();
    this.filter.fileType = this.filterFileTypeOptions[0].value;

    this.init().subscribe();

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
      { value: '', display: '全部', },
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
      this.getCategories(),
      this.getGallery(),
    );
  }

  private getCategories() {
    return this.galleryService.getGalleryCategory().pipe(
      tap(categories => this.categories = categories)
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

  private maintainCategory(action: 'Create' | 'Update', category: GalleryCategoryInfoModel) {
    return this.modalService.openComponent({
      component: GalleryCategoryMaintainModalComponent,
      componentInitData: {
        action,
        categoryID: action === 'Update' ? category.categoryId : undefined,
        categoryName: action === 'Update' ? category.categoryName : undefined,
        parentId: action === 'Update' ? this.tree.findParent(category)?.categoryId : category.categoryId,
        assignDeptId: action === 'Update' ? category.assignDeptId : this.authorizationService.getCurrentLoginInfo().deptId,
      }
    });
  }

  private uploadFileToCategory(category: GalleryCategoryInfoModel) {
    return this.modalService.openComponent({
      component: UploadGalleryModalComponent,
      componentInitData: {
        categoryName: category.categoryName,
        categoryId: category.categoryId,
      }
    });
  }

  private updateGallery(gallery: GalleryInfoModel) {
    return this.modalService.openComponent({
      component: UploadGalleryModalComponent,
      componentInitData: {
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
        case event.ActionType.UPLOAD:
          action = this.uploadFileToCategory(event.data);
          break;
        case event.ActionType.CREATE:
          action = this.maintainCategory('Create', event.data);
          break;
        case event.ActionType.EDIT:
          action = this.maintainCategory('Update', event.data);
          break;
        case event.ActionType.DELETE:
          action = this.galleryService.deleteGalleryCategory(event.data.categoryId).pipe(
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
    const input = (this.elementRef.nativeElement as HTMLElement).querySelector(`#${this.clipBoardInputId}`) as HTMLInputElement;
    input.setAttribute('type', 'text');
    input.setAttribute('value', text);
    input.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      input.setAttribute('type', 'hidden');
      alert('複製成功，請直接貼上使用!!');
    } catch (err) {
      alert('無法複製到剪貼板');
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
          action = this.galleryService.deleteGallery(event.data.galleryId).pipe(
            map(_ => 'Deleted')
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

}
