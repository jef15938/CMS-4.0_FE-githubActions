import { Component, OnInit, Input } from '@angular/core';
import { CustomDialogBase, CustomDialogActionButton } from 'projects/cms-lib/src/lib/ui/dialog/custom-dialog-base';
import { NgModel } from '@angular/forms';
import { GalleryService } from 'projects/cms-lib/src/lib/service/gallery.service';

@Component({
  selector: 'cms-gallery-category-maintain-dialog',
  templateUrl: './gallery-category-maintain-dialog.component.html',
  styleUrls: ['./gallery-category-maintain-dialog.component.css']
})
export class GalleryCategoryMaintainDialogComponent extends CustomDialogBase implements OnInit {

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}媒體庫群組`;
  actions: CustomDialogActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  @Input() categoryID: string;
  @Input() category_name: string;
  @Input() parent_id: string;
  @Input() assign_dept_id: string;

  constructor(
    private _galleryService: GalleryService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  private _save() {
    return (
      this.action === 'Create'
        ? this._galleryService.createGalleryCategory(this.category_name, this.assign_dept_id, this.parent_id)
        : this._galleryService.putGalleryCategoryByCategoryID(this.categoryID)
    );
  }

  confirm() {
    this._save().subscribe(_ => {
      this.close('Success');
    });
  }

  getErrorMessage(model: NgModel) {
    if (model.hasError('required')) return 'Required';
  }

}
