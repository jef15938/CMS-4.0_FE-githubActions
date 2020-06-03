import { HtmlEditorElementController } from './../_base';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { merge, fromEvent, Subscription } from 'rxjs';

const IS_FAKE = 'IS_FAKE';

export class HtmlEditorImageController extends HtmlEditorElementController<HTMLImageElement> {

  private _editorContainer: HTMLDivElement;
  private _controllers: HTMLDivElement[];
  private _drag$: Subscription;

  private _mutationObservers: MutationObserver[];


  onAddToEditor(editorContainer: HTMLDivElement): void {
    if (this.el[IS_FAKE]) { return; }
    console.warn('onAddToEditor', this.el);
    this.el.style.removeProperty('outline');
    this._editorContainer = editorContainer;
    this._registerSizeControl(this.el);

    const observerHandler = (records) => {
      this._checkControllerPosition(this.el);
    };

    const imgObserver = new MutationObserver(observerHandler);
    const imgParentObserver = new MutationObserver(observerHandler);

    imgObserver.observe(this.el, {
      attributeOldValue: true,
      attributes: true,
      attributeFilter: ['width', 'height', 'offsetTop', 'offsetLeft'],
      characterData: true,
      childList: true,
      subtree: true
    });

    imgParentObserver.observe(this.el.parentElement, {
      attributeOldValue: true,
      attributes: true,
      attributeFilter: ['style'],
      characterData: true,
      childList: true,
      subtree: true
    });

    this._mutationObservers = [imgObserver, imgParentObserver];
  }

  onRemovedFromEditor(editorContainer: HTMLDivElement): void {
    if (this.el[IS_FAKE]) { return; }
    if (this._editorContainer.contains(this.el)) { return; }
    console.warn('onRemovedFromEditor', this.el);
    this._mutationObservers?.forEach(observer => {
      observer.disconnect();
    });
    this._drag$?.unsubscribe();
    this._unRegisterSizeControl(this.el);
  }

  onSelected(): void {
    if (this.el[IS_FAKE]) { return; }
    this.el.style.setProperty('outline', '3px solid #b4d7ff');
    this._controllers?.forEach(c => {
      if (!this._editorContainer.contains(c)) {
        this._editorContainer.appendChild(c);
      }
    });
    this._checkControllerPosition(this.el);

    const index = Array.from(this.el.parentNode.childNodes).indexOf(this.el);
    this.context.selecitonRangeService.setSelectionOnNode(this.el.parentNode, index, index + 1);
  }

  onUnselected(): void {
    if (this.el[IS_FAKE]) { return; }
    console.warn('onUnselected');
    this.el.style.removeProperty('outline');
    this._controllers.forEach(c => {
      if (this._editorContainer.contains(c)) {
        this._editorContainer.removeChild(c);
      }
    });
  }

  private _checkControllerPosition(img: HTMLImageElement) {
    this._consoleImgInfo(img);
    const controllers = this._controllers || [];
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
    this._drag$?.unsubscribe();

    this._controllers?.forEach(c => {
      if (this._editorContainer.contains(c)) {
        this._editorContainer.removeChild(c);
      }
    });
  }

  private _registerSizeControl(img: HTMLImageElement) {
    this._consoleImgInfo(img);

    const topLeft = document.createElement('div');
    const topRight = document.createElement('div');
    const bottomLeft = document.createElement('div');
    const bottomRight = document.createElement('div');

    topLeft.style.cursor = bottomRight.style.cursor = 'nwse-resize';
    topRight.style.cursor = bottomLeft.style.cursor = 'nesw-resize';

    const controllers = [topLeft, topRight, bottomLeft, bottomRight];
    this._controllers = controllers;

    controllers.forEach(c => {
      c.setAttribute('contenteditable', 'false');
      c.style.backgroundColor = '#b4d7ff';
      c.style.position = 'absolute';
      c.style.width = c.style.height = '10px';
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
          fake[IS_FAKE] = true;
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

                this._consoleImgInfo(img);

                this.context.checkSelected();
              })
            ))
          );
        }
      )
    ).subscribe();

    this._drag$ = drag$;
  }

  private _consoleImgInfo(img: HTMLImageElement) {
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