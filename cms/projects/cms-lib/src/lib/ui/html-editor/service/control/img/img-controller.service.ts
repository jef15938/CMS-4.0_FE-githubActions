import { ImgSizeControlService } from './img-size-control.service';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { IImgController } from './img-controller.interface';
import { IHtmlEditorContext } from '../../../html-editor.interface';

export class ImgController implements IImgController {

  private _context: IHtmlEditorContext;

  private _imgSizeControlService: ImgSizeControlService;

  private _container: HTMLDivElement;
  private _img: HTMLImageElement;

  imgChange$: Subject<HTMLImageElement>;
  private _destroy$: Subject<void>;

  constructor() { }

  init(context: IHtmlEditorContext, container: HTMLDivElement) {
    this.onDestroy();
    this._context = context;
    this._container = container;
    this.imgChange$ = new Subject();
    this._destroy$ = new Subject();

    this._imgSizeControlService = new ImgSizeControlService();
    this._imgSizeControlService.init(this._container, this);

    this._context.selectedChange$.pipe(
      takeUntil(this._destroy$),
      tap(selected => {
        if (!selected || selected.tagName.toLocaleLowerCase() !== 'img') { // 沒選擇或選擇的不是 img
          this._unselectImg();
        } else if (selected !== this._img) {
          this._selectImg(selected as HTMLImageElement);
        }
      })
    ).subscribe();

  }

  private _selectImg(img: HTMLImageElement) {
    img.style.outline = '3px solid #b4d7ff';
    this._img = img;
    this.imgChange$.next(this._img);
  }

  private _unselectImg() {
    if (!this._img) { return; }
    this._img.style.removeProperty('outline');
    this._img = undefined;
    this.imgChange$.next(this._img);
  }

  onDestroy() {
    this._destroy$?.next();
    this._destroy$?.complete();
    this._destroy$?.unsubscribe();
    this.imgChange$?.unsubscribe();
    this._context = undefined;
    this._container = undefined;
    this._imgSizeControlService?.onDestroy();
    this._imgSizeControlService = undefined;
  }

  consoleImgInfo(img: HTMLImageElement) {
    // console.warn('img.clientHeight', img.clientHeight);
    // console.warn('img.clientLeft', img.clientLeft);
    // console.warn('img.clientTop', img.clientTop);
    // console.warn('img.clientWidth', img.clientWidth);
    // console.warn('img.offsetHeight', img.offsetHeight);
    // console.warn('img.offsetLeft', img.offsetLeft);
    // console.warn('img.offsetTop', img.offsetTop);
    // console.warn('img.offsetWidth', img.offsetWidth);
  }
}