import { Subject } from 'rxjs';
import { IHtmlEditorContext } from '../../../html-editor.interface';

export interface IImgController {
  context: IHtmlEditorContext;
  container: HTMLDivElement;
  imgChange$: Subject<HTMLImageElement>;
  consoleImgInfo(img: HTMLImageElement): void;
}