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
  checkedDepts: DepartmentInfo[] = [];

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}媒體庫群組`;

  constructor(
    private galleryService: GalleryService,
    private departmentService: DepartmentService,
  ) {
    super();
  }

  ngOnInit(): void {
    const assignedDeptIds = this.assignDeptId.split(',');
    this.departmentService.getAllDepartment().subscribe(depts => {
      this.checkedDepts = this.getDeptsByDeptIds(assignedDeptIds, depts);
      this.depts = depts;
    });
  }

  private getDeptsByDeptIds(deptIds: string[], sources: DepartmentInfo[], results: DepartmentInfo[] = []): DepartmentInfo[] {
    if (!sources?.length) { return results; }
    results = results.concat(sources.filter(source => deptIds.indexOf(source.dept_id) > -1));
    sources = sources.reduce((a, b) => a.concat(b.children || []), []);
    return this.getDeptsByDeptIds(deptIds, sources, results);
  }

  private save() {
    const checkedDeptIds = Array.from(new Set(this.checkedDepts.map(dept => dept.dept_id)));
    const assignDeptId = checkedDeptIds.length ? checkedDeptIds.join(',') : '';
    return (
      this.action === 'Create'
        ? this.galleryService.createGalleryCategory(this.categoryName, assignDeptId, this.parentId)
        : this.galleryService.putGalleryCategoryByCategoryID(this.categoryID, this.categoryName, assignDeptId, this.parentId)
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
    this.checkedDepts = ev.nodes;
  }

  deptDisabled = (dept: DepartmentInfo): boolean => {
    return this.depts?.length && dept === this.depts[0];
  }

}
