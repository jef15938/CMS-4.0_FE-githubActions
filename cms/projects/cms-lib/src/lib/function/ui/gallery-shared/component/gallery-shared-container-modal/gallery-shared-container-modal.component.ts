import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../../ui/modal';
import { GallerySharedComponent } from '../gallery-shared/gallery-shared.component';

@Component({
  selector: 'cms-gallery-shared-container-modal',
  templateUrl: './gallery-shared-container-modal.component.html',
  styleUrls: ['./gallery-shared-container-modal.component.scss']
})
export class GallerySharedContainerModalComponent extends CustomModalBase implements OnInit {

  @ViewChild(GallerySharedComponent) gallerySharedComponent: GallerySharedComponent;

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  // @Input() content: string;

  constructor() { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-gallery-shared-container-modal');
  }

  confirm() {
    // const content = this.htmlEditorComponent.getContent();
    // this.close(content);
  }

}
