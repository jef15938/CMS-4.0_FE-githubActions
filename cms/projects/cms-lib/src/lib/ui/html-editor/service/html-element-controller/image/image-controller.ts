import { HtmlEditorElementController } from './../_base';
import { takeUntil, tap, switchMap, delay, takeWhile } from 'rxjs/operators';
import { merge, fromEvent, Subscription } from 'rxjs';

const IS_FAKE = 'IS_FAKE';

export class HtmlEditorImageController extends HtmlEditorElementController<HTMLImageElement> {

  private _controllers: HTMLDivElement[];
  private _drag$: Subscription;
  private _parent: HTMLElement;
  private _mutationObservers: MutationObserver[] = [];
  private _subscriptions: Subscription[] = [];
  private _isSelected = false;

  protected onAddToEditor(editorContainer: HTMLDivElement): void {
    if (this.el[IS_FAKE]) { return; }

    this._parent = this._findParent();
    if (!this._parent) { return; }

    this.el.style.removeProperty('outline');
    this._registerSizeControl();

    this._observeImgAndParent();
    this._subscribeContainerEvent();
  }

  protected onRemovedFromEditor(editorContainer: HTMLDivElement): void {
    if (this.el[IS_FAKE]) { return; }

    this._mutationObservers?.forEach(observer => {
      observer.disconnect();
    });
    this._mutationObservers = [];

    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this._subscriptions = [];

    this._unRegisterSizeControl();
  }

  private _observeImgAndParent() {
    if (this.el[IS_FAKE]) { return; }

    const observerHandler = (records) => {
      this._doCheck();
    };

    const imgObserver = new MutationObserver(observerHandler);
    imgObserver.observe(this.el, {
      attributeOldValue: true,
      attributes: true,
      attributeFilter: ['width', 'height', 'offsetTop', 'offsetLeft'],
      characterData: true,
      childList: true,
      subtree: true
    });
    this._mutationObservers.push(imgObserver);

    const parent = this._parent;
    if (!parent || parent.tagName.toLowerCase() === 'div') {
      console.error('Image Parent Error', this.el);
    }

    if (parent) {
      const imgParentObserver = new MutationObserver(observerHandler);
      imgParentObserver.observe(parent, {
        attributeOldValue: true,
        attributes: true,
        attributeFilter: ['style'],
        characterData: true,
        childList: true,
        subtree: true
      });
      this._mutationObservers.push(imgParentObserver);
    }

  }

  private _subscribeContainerEvent() {
    if (this.el[IS_FAKE]) { return; }

    const contextActionDone$ = this.context.actionDone$.pipe(
      tap(_ => {
        if (this._isSelected) {
          setTimeout(_=>{
            this.el.click();
          }, 200);
        }
      })
    ).subscribe();
    this._subscriptions.push(contextActionDone$);

    const click$ = fromEvent(this.context.editorContainer.nativeElement, 'click').subscribe((ev: MouseEvent) => {
      if (this.context.simpleWysiwygService.isOrContainsNode(this.el, ev.target)) {
        this._onSelected();
      } else {
        this._onUnselected();
      }
    });
    this._subscriptions.push(click$);

    const keydown$ = fromEvent(this.context.editorContainer.nativeElement, 'keydown').subscribe((ev: KeyboardEvent) => {
      if (
        this._isSelected
        && this.context.simpleWysiwygService.getSelectionHtmlElement(this.context.editorContainer.nativeElement) !== this.el
      ) {
        this._onUnselected();
      }
    });
    this._subscriptions.push(keydown$);
  }

  private _findParent(): HTMLElement {
    return this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer.nativeElement, this.el);
  }

  private _onSelected(): void {
    if (this.el[IS_FAKE]) { return; }

    this._isSelected = true;

    this.el.style.setProperty('outline', '3px solid #b4d7ff');
    this._doCheck();

    const index = Array.from(this.el.parentNode.childNodes).indexOf(this.el);
    this.context.simpleWysiwygService.setSelectionOnNode(this.el.parentNode, index, index + 1);
  }

  private _onUnselected(): void {
    if (this.el[IS_FAKE]) { return; }

    this._isSelected = false;

    this.el.style.removeProperty('outline');
    this._doCheck();
  }

  private _doCheck() {
    const img = this.el;
    if (this.el[IS_FAKE]) { return; }

    const editorContainer = this.context.editorContainer.nativeElement;

    const parent = this._findParent();
    if (parent !== this._parent) {
      this._parent = parent;
      this._mutationObservers?.forEach(m => m.disconnect());
      this._observeImgAndParent();
    }

    const outline = this.el.style.getPropertyValue('outline');

    if (!outline) {
      this._controllers?.forEach(c => {
        if (editorContainer.contains(c)) {
          editorContainer.removeChild(c);
        }
      });
    } else {
      const controllers = this._controllers || [];
      const topLeft = controllers[0];
      const topRight = controllers[1];
      const bottomLeft = controllers[2];
      const bottomRight = controllers[3];
      topLeft.style.top = topRight.style.top = `${img.offsetTop}px`;
      topLeft.style.left = bottomLeft.style.left = `${img.offsetLeft}px`;
      topRight.style.left = bottomRight.style.left = `${img.offsetLeft + img.width - 10}px`;
      bottomLeft.style.top = bottomRight.style.top = `${img.offsetTop + img.height - 10}px`;
      this._controllers?.forEach(c => {
        if (!editorContainer.contains(c)) {
          editorContainer.appendChild(c);
        }
      });
    }
  }

  private _unRegisterSizeControl() {
    if (this.el[IS_FAKE]) { return; }

    this._drag$?.unsubscribe();
    this._drag$ = undefined;

    const editorContainer = this.context.editorContainer.nativeElement;
    this._controllers?.forEach(c => {
      if (editorContainer.contains(c)) {
        editorContainer.removeChild(c);
      }
    });
    this._controllers = [];
  }

  private _registerSizeControl() {
    if (this.el[IS_FAKE]) { return; }

    const img = this.el;
    const topLeft = document.createElement('div');
    const topRight = document.createElement('div');
    const bottomLeft = document.createElement('div');
    const bottomRight = document.createElement('div');

    topLeft.style.cursor = bottomRight.style.cursor = 'nwse-resize';
    topRight.style.cursor = bottomLeft.style.cursor = 'nesw-resize';

    const controllers = [topLeft, topRight, bottomLeft, bottomRight];
    this._controllers = controllers;

    controllers.forEach((c, i) => {
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
          const controller = start.target as HTMLElement;
          const parent = controller.parentElement;

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

                const index = Array.from(this.el.parentNode.childNodes).indexOf(this.el);
                this.context.simpleWysiwygService.setSelectionOnNode(this.el.parentNode, index, index + 1);
              })
            ))
          );
        }
      )
    ).subscribe();

    this._drag$ = drag$;
  }

}