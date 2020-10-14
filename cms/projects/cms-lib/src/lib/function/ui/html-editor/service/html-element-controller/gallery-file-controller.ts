import { HtmlEditorLinkController } from './link-controller';
import { ModifyFile, CreateLink } from '../../actions/action/_index';
import { HtmlEditorActionCategory } from '../../actions/action.enum';


export class HtmlEditorGalleryFileController extends HtmlEditorLinkController {

  protected onAddToEditor(): void {
    super.onAddToEditor();
    this.contextMenuItems = [
      { category: HtmlEditorActionCategory.FILE, text: '變更檔案', icon: 'edit', action: new ModifyFile(this.context) },
      { category: HtmlEditorActionCategory.FILE, text: '連結', icon: 'link', action: new CreateLink(this.context) },
    ];
  }

}
