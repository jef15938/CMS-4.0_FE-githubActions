import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../../ui/modal';
import { GallerySharedComponent } from '../gallery-shared/gallery-shared.component';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { GalleryFileType } from '../../type/gallery-shared.type';

@Component({
  selector: 'cms-gallery-shared-container-modal',
  templateUrl: './gallery-shared-container-modal.component.html',
  styleUrls: ['./gallery-shared-container-modal.component.scss']
})
export class GallerySharedContainerModalComponent extends CustomModalBase implements OnInit {

  @ViewChild(GallerySharedComponent) gallerySharedComponent: GallerySharedComponent;

  @Input() title = '';
  @Input() allowedFileTypes: GalleryFileType[] = [];

  actions: CustomModalActionButton[];

  constructor() { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-gallery-shared-container-modal');
  }

  onGalleryClick(gallery: GalleryInfo) {
    this.close(gallery);
  }

}
