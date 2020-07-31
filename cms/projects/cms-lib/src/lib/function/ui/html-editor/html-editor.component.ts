import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, OnDestroy, Injector } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from '../modal';
import { HtmlEditorContext, HtmlEditorContextMenuItem } from './html-editor.interface';
import { HtmlEditorElementControllerFactory } from './service/html-element-controller/_factory';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';
import { HtmlEditorAction } from './actions/action.interface';
import { ATTRIBUTE_FRAME_ID } from './const/html-editor-container.const';
import { YoutubeUtil } from './service/youtube-util';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent implements HtmlEditorContext, OnInit, AfterViewInit, OnDestroy {

  private readonly defaultContent = '<p>請輸入內容</p>';

  @Input() content = '';

  @ViewChild('EditorContainer') private editorContainerElRef: ElementRef<HTMLDivElement>;
  @ViewChild('MenuTrigger') private editorMenu: MatMenuTrigger;

  commonAncestorContainer: Node;

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
  ) { }

  ngOnInit() {

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
    content = this.convertToEditorContent(content);
    this.editorContainer.innerHTML = content;
    this.checkInnerHtml();
  }

  private convertToEditorContent(htmlString: string) {
    htmlString = htmlString || '';
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    const iframes = Array.from(div.querySelectorAll('iframe'));
    iframes.forEach(iframe => {
      const parent = iframe.parentElement;
      const videoUrl = iframe.src;
      const img = document.createElement('img');
      img.setAttribute(ATTRIBUTE_FRAME_ID, videoUrl);
      img.src = YoutubeUtil.convertVideoUrlToImageUrl(videoUrl);
      img.style.width = '100%';
      img.style.height = 'auto';
      parent.insertBefore(img, iframe);
      parent.removeChild(iframe);
    });
    return div.innerHTML;
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
              this.commonAncestorContainer = special;
              return;
            }
          }
        }
        // console.warn('document:selectionchange,  range = ', range);
        this.commonAncestorContainer = range.commonAncestorContainer;
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
        .filter(node => allRemovedNodes.indexOf(node) < 0)
        .filter(node => this.simpleWysiwygService.isChildOf(node, editorContainer));
      // console.log('acturallyAddedNodes = ', acturallyAddedNodes);

      const acturallyRemovedNodes = allRemovedNodes
        .filter(node => allAddedNodes.indexOf(node) < 0)
        .filter(node => this.simpleWysiwygService.isChildOf(node, editorContainer));
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
      return;
    }
  }

  onRightClick(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    const special =
      this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'img')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'iframe')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'table')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'a')
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
    if (!this.isSelectionInsideEditorContainer) { return; }

    action.do().subscribe(_ => {

    });
  }

  getContent() {
    const container = this.editorContainer.cloneNode(true) as HTMLElement;
    let nodes = [container];
    while (nodes && nodes.length) {
      nodes.forEach(node => {
        node.classList?.remove('selected');
        node.style?.removeProperty('outline');
        if (node.tagName?.toLowerCase() === 'img' && node.getAttribute(ATTRIBUTE_FRAME_ID)) {
          const frameId = node.getAttribute(ATTRIBUTE_FRAME_ID);
          const iframe = document.createElement('iframe');
          iframe.src = frameId;
          iframe.setAttribute('style', 'width: 100%; height: 100%;');
          node.parentNode.insertBefore(iframe, node);
          node.parentNode.removeChild(node);
        }
      });
      nodes = nodes.reduce((a, b) => {
        return a.concat(Array.from(b.childNodes || []));
      }, []);
    }

    let htmlString = container.innerHTML || '';

    const regDivStart = new RegExp(/<div/, 'g');
    const regDivEnd = new RegExp(/<\/div>/, 'g');
    htmlString = htmlString.replace(regDivStart, '<p').replace(regDivEnd, '</p>');
    return htmlString;
  }
}
