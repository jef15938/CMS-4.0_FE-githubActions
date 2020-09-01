import { HtmlEditorLinkController } from './link-controller';
import { ModifyFile, CreateLink } from '../../actions/action/_index';


export class HtmlEditorGalleryFileController extends HtmlEditorLinkController {

  protected onAddToEditor(): void {
    super.onAddToEditor();
    this.contextMenuItems = [
      { text: '變更檔案', icon: 'edit', action: new ModifyFile(this.context) },
      { text: '連結', icon: 'link', action: new CreateLink(this.context) },
    ];
  }

}
