import { merge, fromEvent, Subscription, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { IImgController } from './img-controller.interface';

export class ImgSizeControlService {

  private _img: HTMLImageElement;

  private _destroy$: Subject<void>;
  private _imageController: IImgController;

  init(imageController: IImgController) {
    this.onDestroy();
    this._destroy$ = new Subject();
    this._imageController = imageController;

    this._imageController.imgChange$.pipe(
      takeUntil(this._destroy$),
      tap(img => {
        if (!img) {
          this._unselectImg();
        } else {
          this._selectImg(img);
        }
      }),
    ).subscribe();
  }

  onDestroy() {
    this._unselectImg();
    this._destroy$?.next();
    this._destroy$?.complete();
    this._destroy$?.unsubscribe();
    this._imageController = undefined;
  }

  private _selectImg(img: HTMLImageElement) {
    if (img !== this._img || !this._img['controllers']) {
      this._registerSizeControl(img);
      this._img = img;
    } else {
      this._checkControllerPosition(this._img);
    }

  }

  private _unselectImg() {
    if (!this._img) { return; }
    this._unRegisterSizeControl(this._img);
    this._img = undefined;
  }

  private _checkControllerPosition(img: HTMLImageElement) {
    this._imageController.consoleImgInfo(img);
    const controllers = img['controllers'];
    const topLeft = controllers[0];
    const topRight = controllers[1];
    const bottomLeft = controllers[2];
    const bottomRight = controllers[3];
    topLeft.style.top = topRight.style.top = `${img.offsetTop}px`;
    topLeft.style.left = bottomLeft.style.left = `${img.offsetLeft}px`;
    topRight.style.left = bottomRight.style.left = `${img.offsetLeft + img.width - 10}px`;
    bottomLeft.style.top = bottomRight.style.top = `${img.offsetTop + img.height - 10}px`;
  }

  private _unRegisterSizeControl(img: HTMLImageElement) {
    const drag$ = img['drag$'];
    if (drag$ && drag$ instanceof Subscription) {
      drag$.unsubscribe();
      delete img['drag$'];
    }

    const controllers: HTMLDivElement[] = img['controllers'];
    if (controllers) {
      controllers.forEach(c => {
        if (this._imageController.container.contains(c)) {
          this._imageController.container.removeChild(c);
        }
      });
      delete img['controllers'];
    }
  }

  private _registerSizeControl(img: HTMLImageElement) {
    this._imageController.consoleImgInfo(img);

    const topLeft = document.createElement('div');
    const topRight = document.createElement('div');
    const bottomLeft = document.createElement('div');
    const bottomRight = document.createElement('div');

    topLeft.style.cursor = bottomRight.style.cursor = 'nwse-resize';
    topRight.style.cursor = bottomLeft.style.cursor = 'nesw-resize';

    const controllers = [topLeft, topRight, bottomLeft, bottomRight];
    img['controllers'] = controllers;

    this._checkControllerPosition(img);

    controllers.forEach(c => {
      c.setAttribute('contenteditable', 'false');
      c.style.backgroundColor = '#b4d7ff';
      c.style.position = 'absolute';
      c.style.width = c.style.height = '10px';
    });

    controllers.forEach(c => {
      this._imageController.container.appendChild(c);
    });

    const mousedown$ = merge(
      fromEvent<MouseEvent>(topLeft, 'mousedown'),
      fromEvent<MouseEvent>(topRight, 'mousedown'),
      fromEvent<MouseEvent>(bottomLeft, 'mousedown'),
      fromEvent<MouseEvent>(bottomRight, 'mousedown'),
    );
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap(
        (start) => {
          const controller = start.target || start.srcElement;
          const parent = (controller as HTMLElement).parentElement;

          const fake: HTMLImageElement = document.createElement('img');
          fake.src = img.src;
          fake.height = img.height;
          fake.width = img.width;
          fake.style.position = 'absolute';
          fake.style.border = '1px gray dashed';
          fake.style.opacity = '0.5';
          fake.style.left = `${img.offsetLeft}px`;
          fake.style.top = `${img.offsetTop}px`;

          const helper = document.createElement('div');
          helper.style.position = 'fixed';
          helper.style.background = 'black';
          helper.style.color = 'white';
          helper.style.fontSize = '14px';
          helper.style.padding = '5px';
          helper.style.borderRadius = '5px';

          parent.appendChild(fake);
          parent.appendChild(helper);

          const originHeight = img.height;
          const originWidth = img.width;

          let previousMove: MouseEvent;

          return mousemove$.pipe(
            tap(move => {
              move.preventDefault();
              const nowPoint = move;
              const previousPoint = previousMove || start;
              const diffX = nowPoint.clientX - previousPoint.clientX;
              const diffY = nowPoint.clientY - previousPoint.clientY;

              if (controller === topLeft) {
                fake.style.left = `${img.offsetLeft + diffX}px`;
                fake.style.top = `${img.offsetTop + diffY}px`;
                fake.style.width = `${originWidth - diffX}px`;
                fake.style.height = `${originHeight - diffY}px`;
              }
              if (controller === topRight) {
                fake.style.top = `${img.offsetTop + diffY}px`;
                fake.style.width = `${originWidth + diffX}px`;
                fake.style.height = `${originHeight - diffY}px`;
              }
              if (controller === bottomLeft) {
                fake.style.left = `${img.offsetLeft + diffX}px`;
                fake.style.width = `${originWidth - diffX}px`;
                fake.style.height = `${originHeight + diffY}px`;
              }
              if (controller === bottomRight) {
                fake.style.width = `${originWidth + diffX}px`;
                fake.style.height = `${originHeight + diffY}px`;
              }
              helper.innerText = `${fake.style.width.replace('px', '')} x ${fake.style.height.replace('px', '')}`;
              helper.style.left = `${nowPoint.x + 20}px`;
              helper.style.top = `${nowPoint.y + 20}px`;
            }),
            takeUntil(mouseup$.pipe(
              tap(mouseup => {
                const height = fake.style.height.replace('px', '') || originHeight;
                const width = fake.style.width.replace('px', '') || originWidth;
                parent.removeChild(fake);
                parent.removeChild(helper);
                img.height = +height;
                img.width = +width;

                this._imageController.consoleImgInfo(img);
                
                this._imageController.context.checkSelected();
              })
            ))
          );
        }
      )
    ).subscribe();

    img['drag$'] = drag$;
  }
}