import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, OnDestroy, Injector, Inject } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from '../modal';
import { HtmlEditorContext, HtmlEditorContextMenuItem, HtmlEditorConfig } from './html-editor.interface';
import { HtmlEditorElementControllerFactory } from './service/html-element-controller/_factory';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';
import { HtmlEditorAction } from './actions/action.interface';
import { VIDEO_ATTR_FRAME_ID, GALLERY_ATTR_GALLERY_ID, TABLE_CLASS_BASE_ROW } from './const/html-editor-container.const';
import { YoutubeUtil } from './service/youtube-util';
import { CMS_ENVIROMENT_TOKEN } from '../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../global/interface';
import { CmsErrorHandler } from '../../../global/error-handling';
import { HTML_EDITOR_CONFIG_TOKEN } from './html-editor.injection-token';
import { HTML_EDITOR_CONFIG_DEFAULT } from './config/html-editor-config-default';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent implements HtmlEditorContext, OnInit, AfterViewInit, OnDestroy {

  private readonly defaultContent = '<p>請輸入內容</p>';

  @Input() content = '';
  @Input() configName = 'default';

  @ViewChild('EditorContainer') private editorContainerElRef: ElementRef<HTMLDivElement>;
  @ViewChild('MenuTrigger') private editorMenu: MatMenuTrigger;

  selectedTarget: Node;

  config: HtmlEditorConfig;

  get editorContainer() { return this.editorContainerElRef?.nativeElement; }
  get isSelectionInsideEditorContainer() {
    return this.editorContainer && this.simpleWysiwygService.isSelectionInside(this.editorContainer);
  }

  private mutationObserver: MutationObserver;

  contextMenuPosition = { x: '0px', y: '0px' };
  contextMenuItems: HtmlEditorContextMenuItem[] = [];

  private destroy$ = new Subject();

  constructor(
    public injector: Injector,
    public simpleWysiwygService: SimpleWysiwygService,
    public modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
    @Inject(HTML_EDITOR_CONFIG_TOKEN) private configs: HtmlEditorConfig[],
  ) { }

  ngOnInit() {
    this.config = [...(this.configs || [])].reverse().find(c => c.name === this.configName) || HTML_EDITOR_CONFIG_DEFAULT;
  }

  ngAfterViewInit(): void {
    this.initContentAndContainer(this.content, this.editorContainer);
    this.observeContainer(this.editorContainer);
    this.subscribeDocumentSelectionChange();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    this.mutationObserver?.disconnect();
  }

  private initContentAndContainer(content: string, container: HTMLDivElement) {
    content = this.convertToEditorContent(content) || this.defaultContent;
    this.editorContainer.innerHTML = content;
    this.checkInnerHtml();
  }

  private convertToEditorContent(htmlString: string) {
    htmlString = htmlString || '';
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    const imgs = Array.from(tempContainer.querySelectorAll(`img[${GALLERY_ATTR_GALLERY_ID}]`));
    imgs.forEach(img => {
      const galleryID = img.getAttribute(GALLERY_ATTR_GALLERY_ID);
      if (galleryID) {
        const src = img.getAttribute('src');
        if (src.indexOf(this.environment.apiBaseUrl) < 0) {
          img.setAttribute('src', `${this.environment.apiBaseUrl}${src}`);
        }
      }
    });

    const iframes = Array.from(tempContainer.querySelectorAll('iframe'));
    iframes.forEach(iframe => {
      const parent = iframe.parentElement;
      const videoUrl = iframe.src;
      const img = document.createElement('img');
      img.setAttribute(VIDEO_ATTR_FRAME_ID, videoUrl);
      img.src = YoutubeUtil.convertVideoUrlToImageUrl(videoUrl);
      img.style.width = '100%';
      img.style.height = 'auto';
      parent.insertBefore(img, iframe);
      parent.removeChild(iframe);
    });

    const tables = Array.from(tempContainer.querySelectorAll('table'));
    tables.forEach(table => {
      const headerTr = Array.from(table.querySelectorAll('thead>tr')).filter(tr => !tr.classList.contains(TABLE_CLASS_BASE_ROW))[0];
      if (!headerTr) { return; }
      // <th> to <td>
      const ths = Array.from(headerTr.querySelectorAll('th'));
      ths.forEach(th => {
        const td = document.createElement('td');
        th.classList.forEach(c => {
          td.classList.add(c);
        });
        td.colSpan = th.colSpan;
        td.rowSpan = th.rowSpan;
        td.innerHTML = th.innerHTML;
        headerTr.insertBefore(td, th);
        headerTr.removeChild(th);
      });
      // insert <tr> to <tbody>
      const tbody = table.querySelector('tbody');
      const firstTr = tbody.firstElementChild;
      !!firstTr ? tbody.insertBefore(headerTr, firstTr) : tbody.appendChild(headerTr);
    });

    return tempContainer.innerHTML;
  }

  checkInnerHtml(): void {
    const container = this.editorContainer;
    let childNodes = Array.from(container.childNodes) || [];
    while (childNodes && childNodes.length) {

      childNodes.forEach(node => {
        HtmlEditorElementControllerFactory.addController(node as HTMLElement, this)?.addToEditor(this.editorContainer);
      });

      childNodes = Array.from(childNodes).map(node => Array.from(node.childNodes))
        .reduce((accumulator, currentValue) => {
          return accumulator.concat(currentValue);
        }, []);
    }
  }

  private subscribeDocumentSelectionChange() {
    fromEvent(document, 'selectionchange').pipe(
      takeUntil(this.destroy$),
    ).subscribe(_ => {
      setTimeout(__ => {
        if (!this.editorContainer) { return; }
        if (!this.isSelectionInsideEditorContainer) { return; }

        const range = this.simpleWysiwygService.getRange();
        const sel = window.getSelection();

        if (sel.anchorNode === sel.focusNode && sel.anchorOffset + 1 === sel.focusOffset) {
          const parent = sel.anchorNode;
          const children = Array.from(parent.childNodes);
          const target = children[sel.anchorOffset] as HTMLElement;
          if (target) {
            const special =
              this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'img')
              || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'iframe')
              || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'table')
              || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'a')
              ;
            if (special) {
              this.selectedTarget = special;
              return;
            }
          }
        }
        // console.warn('document:selectionchange,  range = ', range);
        this.selectedTarget = range.commonAncestorContainer;
      }, 0);
    });
  }

  private observeContainer(editorContainer: HTMLDivElement) {
    const mutationObserver = new MutationObserver((records) => {
      // console.warn('records = ', records);

      const allAddedNodes = records.map(r => Array.from(r.addedNodes))
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
        .filter((node, i, arr) => arr.indexOf(node) === i);
      // console.log('allAddedNodes = ', allAddedNodes);

      const allRemovedNodes = records.map(r => Array.from(r.removedNodes))
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
        .filter((node, i, arr) => arr.indexOf(node) === i);
      // console.log('allRemovedNodes = ', allRemovedNodes);

      let acturallyAddedNodes = allAddedNodes
        // .filter(node => allRemovedNodes.indexOf(node) < 0)
        .filter(node => this.simpleWysiwygService.isChildOf(node, editorContainer));
      // console.log('acturallyAddedNodes = ', acturallyAddedNodes);

      const acturallyRemovedNodes = allRemovedNodes
        .filter(node => allAddedNodes.indexOf(node) < 0);
      // .filter(node => this.simpleWysiwygService.isChildOf(node, editorContainer));
      // console.log('acturallyRemovedNodes = ', acturallyRemovedNodes);

      const changedNodes = []
        .concat(allAddedNodes.filter(node => acturallyAddedNodes.indexOf(node) < 0))
        .concat(allRemovedNodes.filter(node => acturallyRemovedNodes.indexOf(node) < 0))
        .concat(records.filter(r => r.type !== 'childList').map(r => r.target))
        .filter((node, i, arr) => arr.indexOf(node) === i);
      // console.log('changedNodes = ', changedNodes);

      acturallyRemovedNodes.forEach(removedNode => {
        HtmlEditorElementControllerFactory.getController(removedNode as HTMLElement)?.removeFromEditor(editorContainer);
      });

      allAddedNodes.forEach(addedNode => {
        const addedNodeType = addedNode.nodeType;
        const parentElement = addedNode.parentElement;
        if (addedNodeType === Node.TEXT_NODE && parentElement === editorContainer) {
          const nextNode = addedNode.nextSibling;
          const p = document.createElement('p');
          p.appendChild(addedNode);
          if (nextNode) {
            parentElement.insertBefore(p, nextNode);
          } else {
            parentElement.appendChild(p);
          }
        }

        if (addedNodeType === Node.ELEMENT_NODE) {
          const addedEl = addedNode as HTMLElement;
          if (
            (addedEl.tagName.toLowerCase() === 'ol' || addedEl.tagName.toLowerCase() === 'ul')
            && parentElement !== editorContainer && parentElement.tagName.toLowerCase() === 'p'
          ) {
            editorContainer.insertBefore(addedEl, parentElement);
            editorContainer.removeChild(parentElement);
            return;
          }
          if (addedEl.tagName.toLowerCase() === 'div' && !addedEl.classList.length) {
            const p = document.createElement('p');
            p.innerHTML = addedEl.innerHTML;
            parentElement.insertBefore(p, addedEl);
            parentElement.removeChild(addedEl);
            return;
          }
          if (addedEl.tagName.toLowerCase() === 'br' && parentElement === editorContainer) {
            parentElement.removeChild(addedEl);
            return;
          }
        }
      });

      while (acturallyAddedNodes && acturallyAddedNodes.length) {
        acturallyAddedNodes.forEach(addedNode => {
          HtmlEditorElementControllerFactory.addController(addedNode as HTMLElement, this)?.addToEditor(editorContainer);
        });

        acturallyAddedNodes = acturallyAddedNodes.reduce((a, b) => {
          return b ? a.concat(Array.from(b.childNodes)) : [];
        }, []);
      }

      if (!editorContainer.innerHTML) {
        editorContainer.innerHTML = this.defaultContent;
        this.setFocusOnDefaultContent();
      }
    });

    mutationObserver.observe(editorContainer, {
      attributeOldValue: true,
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });

    this.mutationObserver = mutationObserver;
  }

  evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  onClick(ev: MouseEvent) {
    if (ev.target === this.editorContainer) {
      return;
    }

    const target = ev.target as HTMLElement;
    const special =
      this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'img')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'iframe')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'a');
    if (special) {
      this.evPreventDefaultAndStopPropagation(ev);
      this.simpleWysiwygService.setSelectionOnNode(special);
      this.selectedTarget = special;
      return;
    } else {
      this.selectedTarget = target;
    }
  }

  onRightClick(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    const special =
      this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'img')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'iframe')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'a')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'table')
      ;

    if (special) {
      this.openRightClickMenu(ev, special);
      return;
    }
  }

  private openRightClickMenu(ev: MouseEvent, target: HTMLElement) {
    const contextMenuItems = HtmlEditorElementControllerFactory.getContextMenuItems(target as HTMLElement);
    if (!contextMenuItems?.length) { return; }
    this.simpleWysiwygService.setSelectionOnNode(ev.target as Node);
    const range = this.simpleWysiwygService.getRange();
    this.contextMenuPosition.x = ev.clientX + 'px';
    this.contextMenuPosition.y = ev.clientY + 'px';
    this.editorMenu.menuData = { range };
    this.editorMenu.menu.focusFirstItem('mouse');
    const subscription = this.editorMenu.menuClosed.subscribe(_ => {
      subscription.unsubscribe();
      if (!this.simpleWysiwygService.isSelectionInside(this.editorContainer)) {
        this.simpleWysiwygService.restoreSelection(this.editorMenu.menuData.range);
      }
    });
    this.contextMenuItems = contextMenuItems;
    this.editorMenu.openMenu();
  }

  doAction(action: HtmlEditorAction) {
    if (!action) { return; }

    if (!this.config.actionEnable[action.category]) {
      this.modalService.openMessage({ message: '沒有執行此操作的權限' }).subscribe();
      return;
    }

    if (!this.isSelectionInsideEditorContainer) { return; }

    try {
      action.do().subscribe();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'HtmlEditorComponent.doAction()', '執行錯誤');
    }
  }

  getContent() {
    const tempContainer = this.editorContainer.cloneNode(true) as HTMLElement;

    let htmlString = tempContainer.innerHTML || '';

    const regDivStart = new RegExp(/<div/, 'g');
    const regDivEnd = new RegExp(/<\/div>/, 'g');
    htmlString = htmlString.replace(regDivStart, '<p').replace(regDivEnd, '</p>');
    tempContainer.innerHTML = htmlString;

    let nodes = [tempContainer];
    while (nodes && nodes.length) {
      nodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.classList.remove('selected');
          node.style.removeProperty('outline');
          if (node.tagName?.toLowerCase() === 'img' && node.getAttribute(VIDEO_ATTR_FRAME_ID)) {
            const frameId = node.getAttribute(VIDEO_ATTR_FRAME_ID);
            const iframe = document.createElement('iframe');
            iframe.src = frameId;
            iframe.setAttribute('style', 'width: 100%; height: 100%;');
            node.parentNode.insertBefore(iframe, node);
            node.parentNode.removeChild(node);
          }
        }
      });
      nodes = nodes.reduce((a, b) => {
        return a.concat(Array.from(b.childNodes || []));
      }, []);
    }

    const imgs = Array.from(tempContainer.querySelectorAll(`img[${GALLERY_ATTR_GALLERY_ID}]`));
    imgs.forEach(img => {
      const galleryID = img.getAttribute(GALLERY_ATTR_GALLERY_ID);
      if (galleryID) {
        const src = img.getAttribute('src');
        if (src.indexOf(this.environment.apiBaseUrl) > -1) {
          img.setAttribute('src', img.getAttribute('src').replace(this.environment.apiBaseUrl, ''));
        }
      }
    });

    const needRemoveNodesFromTable = Array.from(tempContainer.querySelectorAll('.col-resizer-container, .col-resizer'));
    needRemoveNodesFromTable.forEach(n => n.parentElement.removeChild(n));
    const tables = Array.from(tempContainer.querySelectorAll('table'));
    tables.forEach(table => {
      const firstBodyTr = Array.from(table.querySelectorAll('tbody>tr'))[0];
      if (!firstBodyTr) { return; }
      // <td> to <th>
      const tds = Array.from(firstBodyTr.querySelectorAll('td'));
      tds.forEach(td => {
        const th = document.createElement('th');
        td.classList.forEach(c => {
          th.classList.add(c);
        });
        th.colSpan = td.colSpan;
        th.rowSpan = td.rowSpan;
        th.innerHTML = td.innerHTML;
        firstBodyTr.insertBefore(th, td);
        firstBodyTr.removeChild(td);
      });
      // insert <tr> to <tbody>
      const thead = table.querySelector('thead');
      thead.appendChild(firstBodyTr);
    });

    const blankPs = Array.from(tempContainer.querySelectorAll('p'))
      .filter(p => !p.innerHTML && !p.innerText);
    blankPs.forEach(n => n.parentElement.removeChild(n));

    return tempContainer.innerHTML || '';
  }

  onFocus(ev) {
    setTimeout(() => {
      this.setFocusOnDefaultContent();
    }, 100);
  }

  private setFocusOnDefaultContent() {
    const editorContainer = this.editorContainer;
    if (editorContainer.innerHTML === this.defaultContent || editorContainer.innerHTML === '<p><br></p>') {
      const firstChild = this.editorContainer.firstChild;
      this.simpleWysiwygService.setSelectionOnNode(this.editorContainer.firstChild, 1);
      this.selectedTarget = this.editorContainer.firstChild;
    }
  }
}
