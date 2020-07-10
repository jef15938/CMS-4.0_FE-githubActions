import { HtmlEditorActionBase } from '../action.base';
import { of, Observable } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { CreateLink } from './create-link';
import { InsertImage, InsertImageConfig } from './insert-image';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { HtmlEditorContext } from '../../html-editor.interface';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { GalleryService } from '../../../../../global/api/service/gallery/gallery.service';

export class InsertFile extends HtmlEditorActionBase {

  private createLink: CreateLink;
  private insertImage: InsertImage;

  constructor(
    context: HtmlEditorContext,
    createLink: CreateLink,
    insertImage: InsertImage,
  ) {
    super(context);
    this.createLink = createLink;
    this.insertImage = insertImage;
  }

  do() {
    const range = this.context.simpleWysiwygService.getRange();
    const gallerySharedService: GallerySharedService = this.context.injector.get(GallerySharedService);

    return gallerySharedService.openGallery().pipe(
      tap(_ => this.context.simpleWysiwygService.restoreSelection(range)),
      concatMap(selectedGallery => this.chooseNextStep(selectedGallery)),
    );
  }

  private chooseNextStep(selectedGallery: GalleryInfo): Observable<any> {
    console.warn('selectedGallery = ', selectedGallery);
    if (!selectedGallery) { return of(undefined); }
    // 'PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PNG', 'JPG', 'JPEG', 'GIF',
    const imgExtensionNames = ['png', 'jpg', 'jpeg', 'gif'];
    if (imgExtensionNames.indexOf(selectedGallery.file_type) > -1) {
      return this.addImage(selectedGallery);
    } else {
      return this.addFile(selectedGallery);
    }
  }

  private addImage(selectedGallery: GalleryInfo): Observable<any> {
    const galleryService: GalleryService = this.context.injector.get(GalleryService);
    const config: InsertImageConfig = {
      src: `${galleryService.getGalleryShowUrlByGalleryID(selectedGallery.gallery_id)}`,
      alt: ``,
      width: 200,
      height: 200,
    };

    const created = this.insertImage.addImg(config);
    return of(undefined);
  }

  private addFile(selectedGallery: GalleryInfo): Observable<any> {
    return of(undefined);
  }
}
