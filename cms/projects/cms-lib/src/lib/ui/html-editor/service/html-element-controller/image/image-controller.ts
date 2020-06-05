import { HtmlEditorElementController } from './../_base';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { merge, fromEvent, Subscription, Observable } from 'rxjs';

const IS_FAKE = 'IS_FAKE';

export class HtmlEditorImageController extends HtmlEditorElementController<HTMLImageElement> {

  private _controllers: HTMLDivElement[];
  private _subscriptions: Subscription[] = [];

  protected onAddToEditor(): void {
    if (this.el[IS_FAKE]) { return; }

    const parent = this._findParent();
    if (!parent) { return; }

    this._registerSizeControl();
    this._subscribeEvents();
  }

  protected onRemovedFromEditor(): void {
    if (this.el[IS_FAKE]) { return; }

    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this._subscriptions = [];

    this._unRegisterSizeControl();
  }

  private _subscribeEvents() {
    if (this.el[IS_FAKE]) { return; }

    const selectionchange$ = fromEvent(document, 'selectionchange').subscribe(_ => {
      if (!this.context.isSelectionInsideEditorContainer) { return; }

      const range = this.context.simpleWysiwygService.getRange();

      if (range.commonAncestorContainer === this.el) {
        this._onSelected();
      } else {
        this._onUnselected();
      }
    });
    this._subscriptions.push(selectionchange$);
  }

  private _findParent(): HTMLElement {
    return this.context.simpleWysiwygService.findRowRoot(this.context.editorContainer, this.el);
  }

  private _onSelected(): void {
    if (this.el[IS_FAKE]) { return; }

    this.el.style.setProperty('outline', '3px solid #b4d7ff');
    this._doCheck();
  }

  private _onUnselected(): void {
    if (this.el[IS_FAKE]) { return; }

    this.el.style.removeProperty('outline');
    this._doCheck();
  }

  private _doCheck() {
    if (this.el[IS_FAKE]) { return; }

    const img = this.el;
    const editorContainer = this.context.editorContainer;
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
      topLeft.style.top = topRight.style.top = `${img.offsetTop - 5}px`;
      topLeft.style.left = bottomLeft.style.left = `${img.offsetLeft - 5}px`;
      topRight.style.left = bottomRight.style.left = `${img.offsetLeft + img.width - 5}px`;
      bottomLeft.style.top = bottomRight.style.top = `${img.offsetTop + img.height - 5}px`;
      this._controllers?.forEach(c => {
        if (!editorContainer.contains(c)) {
          editorContainer.appendChild(c);
        }
      });
    }
  }

  private _unRegisterSizeControl() {
    if (this.el[IS_FAKE]) { return; }

    const editorContainer = this.context.editorContainer;
    this._controllers?.forEach(c => {
      if (editorContainer.contains(c)) {
        c.removeEventListener('click', this._evPreventDefaultAndStopPropagation);
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
      c.addEventListener('click', this._evPreventDefaultAndStopPropagation);
    });

    const evPreventDefaultAndStopPropagation = (source: Observable<MouseEvent>) => new Observable<MouseEvent>(observer => {
      return source.subscribe({
        next: (ev) => {
          this._evPreventDefaultAndStopPropagation(ev);
          observer.next(ev);
        },
        error(err) { observer.error(err) },
        complete() { observer.complete() }
      });
    });

    const mousedown$ = merge(
      fromEvent<MouseEvent>(topLeft, 'mousedown'),
      fromEvent<MouseEvent>(topRight, 'mousedown'),
      fromEvent<MouseEvent>(bottomLeft, 'mousedown'),
      fromEvent<MouseEvent>(bottomRight, 'mousedown'),
    ).pipe(evPreventDefaultAndStopPropagation);

    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(evPreventDefaultAndStopPropagation);

    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(evPreventDefaultAndStopPropagation);

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

                this.context.simpleWysiwygService.setSelectionOnNode(this.el);
              })
            ))
          );
        }
      )
    ).subscribe();
    this._subscriptions.push(drag$);
  }

  private _evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

}