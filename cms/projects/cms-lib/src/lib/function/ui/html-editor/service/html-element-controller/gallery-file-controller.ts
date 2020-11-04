import { HtmlEditorLinkController } from './link-controller';
import { ModifyFile, CreateLink } from '../../actions/action/_index';
import { HtmlEditorActionCategory } from '../../actions/action.enum';


export class HtmlEditorGalleryFileController extends HtmlEditorLinkController {

  protected onAddToEditor(): void {
    super.onAddToEditor();
    this.contextMenuItems = [
      {
        id: 'change-file',
        category: HtmlEditorActionCategory.FILE, text: '變更檔案', icon: 'edit', action: new ModifyFile(this.context)
      },
      {
        id: 'link',
        category: HtmlEditorActionCategory.FILE, text: '連結', icon: 'link', action: new CreateLink(this.context)
      },
    ];
  }

}
