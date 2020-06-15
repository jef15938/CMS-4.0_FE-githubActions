import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../../../ui/modal/custom-modal-base';
import { NgModel } from '@angular/forms';
import { GalleryService } from './../../../../../../service/gallery.service';

@Component({
  selector: 'cms-gallery-category-maintain-modal',
  templateUrl: './gallery-category-maintain-modal.component.html',
  styleUrls: ['./gallery-category-maintain-modal.component.scss']
})
export class GalleryCategoryMaintainModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}媒體庫群組`;
  actions: CustomModalActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  @Input() categoryID: string;
  @Input() category_name: string;
  @Input() parent_id: string;
  @Input() assign_dept_id: string;

  constructor(
    private galleryService: GalleryService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  private save() {
    console.warn('this.action = ', this.action)
    return (
      this.action === 'Create'
        ? this.galleryService.createGalleryCategory(this.category_name, this.assign_dept_id, this.parent_id)
        : this.galleryService.putGalleryCategoryByCategoryID(this.categoryID, this.category_name, this.assign_dept_id, this.parent_id)
    );
  }

  confirm() {
    this.save().subscribe(_ => {
      this.close('Success');
    });
  }

  getErrorMessage(model: NgModel) {
    if (model.hasError('required')) return 'Required';
  }

}
