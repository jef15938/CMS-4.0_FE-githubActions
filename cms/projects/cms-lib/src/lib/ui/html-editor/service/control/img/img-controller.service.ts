import { ImgSizeControlService } from './img-size-control.service';
import { Subject, merge, fromEvent } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { IImgController } from './img-controller.interface';

export class ImgController implements IImgController{

  private _imgSizeControlService: ImgSizeControlService;

  private _container: HTMLDivElement;
  private _img: HTMLImageElement;

  imgChange$: Subject<HTMLImageElement>;
  private _destroy$: Subject<void>;

  constructor() {
    this._imgSizeControlService = new ImgSizeControlService();
  }

  init(container: HTMLDivElement) {
    this._container = container;
    this.onDestroy();
    this.imgChange$ = new Subject();
    this._destroy$ = new Subject();
    this._container = container;

    merge(
      fromEvent(this._container, 'click').pipe(
        tap((ev: MouseEvent) => this._onContainerClick(ev))
      )
    ).pipe(
      takeUntil(this._destroy$),
    ).subscribe();
    this._imgSizeControlService.init(this._container, this);
  }

  private _onContainerClick(ev: MouseEvent) {
    const target = ev.target || ev.srcElement;
    if (
      this._img
      && (
        !this._container.contains(this._img)
        || (target !== this._img && target !== this._container)
      )
    ) {
      this._unselectImg();
    }

    if (
      (target as HTMLElement).tagName.toLocaleLowerCase() !== 'img'
      || target === this._img
    ) {
      return;
    }

    this._selectImg(target as HTMLImageElement);
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
    this.imgChange$?.unsubscribe();
    this._destroy$?.next();
    this._destroy$?.complete();
    this._destroy$?.unsubscribe();
    this._container = undefined;
    this._imgSizeControlService.onDestroy();
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