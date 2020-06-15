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
import { UploadGalleryModalComponent } from './component/modal/upload-gallery-modal/upload-gallery-modal.component';
import { CropperService } from '../../../ui/cropper/cropper.service';
import { GalleryActionCellComponent, GalleryActionCellCustomEvent } from './component/cell/gallery-action-cell/gallery-action-cell.component';
import { AuthorizationService } from '../../../service/authorization.service';

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
    {
      colId: 'action',
      field: 'action',
      title: '操作',
      cellRenderer: GalleryActionCellComponent,
    }
  ];

  private destroy$ = new Subject();
  private categorySelected$ = new Subject<GalleryCategoryInfo>();

  private url = 'https://i.kym-cdn.com/photos/images/newsfeed/001/430/765/8aa.png';

  constructor(
    private galleryService: GalleryService,
    private authorizationService: AuthorizationService,
    private modalService: ModalService,
    private cropperService: CropperService,
  ) { }

  ngOnInit(): void {
    this.init().subscribe();

    this.categorySelected$.pipe(
      debounceTime(300),
      takeUntil(this.destroy$),
      tap(selectedCategory => this.selectedCategory = selectedCategory),
      concatMap(_ => this.getGallery()),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private init() {
    return concat(
      this.getCategories()
    )
  }

  private getCategories() {
    return this.galleryService.getGalleryCategory().pipe(
      tap(categories => this.categories = categories)
    );
  }

  private getGallery() {
    if (!this.selectedCategory?.category_id) { return of(undefined); }
    return this.galleryService.getGalleryByCategoryID(
      this.selectedCategory.category_id,
      this.galleryPageInfo?.page
    ).pipe(
      tap(res => {
        this.galleryPageInfo = res.pageInfo;
        this.galleryDatas = res.datas;
      })
    )
  }

  private maintainCategory(action: 'Create' | 'Update', category: GalleryCategoryInfo) {
    return this.modalService.openComponent({
      component: GalleryCategoryMaintainModalComponent,
      componentInitData: {
        action,
        categoryID: action === 'Update' ? category.category_id : undefined,
        category_name: action === 'Update' ? category.category_name : undefined,
        parent_id: action === 'Update' ? this.tree.findParent(category)?.category_id : category.category_id,
        assign_dept_id: this.authorizationService.getCurrentLoginInfo().dept_id
      }
    })
  }

  private uploadFileToCategory(category: GalleryCategoryInfo) {
    return this.modalService.openComponent({
      component: UploadGalleryModalComponent,
      componentInitData: {
        category_name: category.category_name,
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
          action = this.galleryService.deleteGalleryCategory(event.data.category_id);
          break;
      }
      action ? action.subscribe() : null;
    }
  }

  onTableCustomEvent(event) {
    if (event instanceof GalleryActionCellCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.Edit:
          action = this.updateGallery(event.data.gallery_id);
          break;
        case event.ActionType.Delete:
          action = this.galleryService.deleteGallery(event.data.gallery_id);
          break;
      }
      action ? action.subscribe() : null;
    }
  }

  onNodeSelected(event: { node: GalleryCategoryInfo }) {
    this.categorySelected$.next(event?.node);
  }

  onPageChanged(event: { pageIndex: number }) {
    this.galleryPageInfo.page = event.pageIndex + 1;
    this.getGallery().subscribe();
  }

  testCropper() {
    this.cropperService.openEditor(this.url).subscribe((dataUrl: string) => {
      // if (!dataUrl) { return; }
      // const blob = this.dataURItoBlob(dataUrl);
      // const newFile = this.mapFileToFileUploadModel(new File([blob], file.data.name, { type: file.fileType }));
      // console.warn('file = ', file);
      // console.warn('newFile = ', newFile);
      // this.files.splice(this.files.indexOf(file), 1, newFile);
    });
  }

}
