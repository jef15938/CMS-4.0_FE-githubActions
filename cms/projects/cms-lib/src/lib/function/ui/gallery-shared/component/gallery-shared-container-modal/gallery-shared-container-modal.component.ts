import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../../ui/modal';
import { GallerySharedComponent } from '../gallery-shared/gallery-shared.component';
import { GalleryFileType } from '../../type/gallery-shared.type';
import { GalleryInfoModel } from '../../../../../global/api/data-model/models/gallery-info.model';

@Component({
  selector: 'cms-gallery-shared-container-modal',
  templateUrl: './gallery-shared-container-modal.component.html',
  styleUrls: ['./gallery-shared-container-modal.component.scss']
})
export class GallerySharedContainerModalComponent extends CustomModalBase<GallerySharedContainerModalComponent, GalleryInfoModel>
  implements OnInit {

  @ViewChild(GallerySharedComponent) gallerySharedComponent: GallerySharedComponent;

  @Input() title = '';
  @Input() allowedFileTypes: GalleryFileType[] = [];

  actions: CustomModalActionButton[];

  constructor() { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-gallery-shared-container-modal');
  }

  onGalleryClick(gallery: GalleryInfoModel) {
    this.close(gallery);
  }

}
