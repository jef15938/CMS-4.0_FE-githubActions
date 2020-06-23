import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { GalleryService } from './../../../../../api/service';
import { CustomModalBase, CustomModalActionButton } from './../../../../../ui/modal';

@Component({
  selector: 'cms-gallery-category-maintain-modal',
  templateUrl: './gallery-category-maintain-modal.component.html',
  styleUrls: ['./gallery-category-maintain-modal.component.scss']
})
export class GalleryCategoryMaintainModalComponent extends CustomModalBase implements OnInit {

  actions: CustomModalActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  @Input() categoryID: string;
  @Input() categoryName: string;
  @Input() parentId: string;
  @Input() assignDeptId: string;

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}媒體庫群組`;

  constructor(
    private galleryService: GalleryService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  private save() {
    console.warn('this.action = ', this.action);
    return (
      this.action === 'Create'
        ? this.galleryService.createGalleryCategory(this.categoryName, this.assignDeptId, this.parentId)
        : this.galleryService.putGalleryCategoryByCategoryID(this.categoryID, this.categoryName, this.assignDeptId, this.parentId)
    );
  }

  confirm() {
    this.save().subscribe(_ => {
      this.close('Success');
    });
  }

  getErrorMessage(model: NgModel) {
    if (model.hasError('required')) { return 'Required'; }
  }

}
