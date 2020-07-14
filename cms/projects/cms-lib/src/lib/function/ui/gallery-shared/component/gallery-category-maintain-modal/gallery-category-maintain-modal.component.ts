import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { GalleryService, DepartmentService } from '../../../../../global/api/service';
import { CustomModalBase, CustomModalActionButton } from '../../../../ui/modal';
import { DepartmentInfo } from '../../../../../global/api/neuxAPI/bean/DepartmentInfo';

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

  depts: DepartmentInfo[] = [];

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}媒體庫群組`;

  constructor(
    private galleryService: GalleryService,
    private departmentService: DepartmentService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.departmentService.getAllDepartment().subscribe(depts => this.depts = depts);
  }

  private save() {
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
    return null;
  }

  onNodeCheckedChange(ev: { nodes: DepartmentInfo[] }) {
    console.warn('onNodeCheckedChange() ev = ', ev);
  }

}
