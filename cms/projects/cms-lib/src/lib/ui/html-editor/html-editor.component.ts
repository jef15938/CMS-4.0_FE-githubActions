import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from './../modal/modal.service';
import { IHtmlEditorContext, IHtmlEditorContextMenuItem } from './html-editor.interface';
import { HtmlEditorElementControllerFactory } from './service/html-element-controller/_factory';
import { SimpleWysiwygService } from './service/simple-wysiwyg.service';
import { IHtmlEditorAction } from './actions/action.interface';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent implements IHtmlEditorContext, OnInit, AfterViewInit, OnDestroy {

  @Input() content = '';

  @ViewChild('EditorContainer') private _editorContainer: ElementRef<HTMLDivElement>;
  @ViewChild('MenuTrigger') private _editorMenu: MatMenuTrigger;

  private _simpleWysiwygService: SimpleWysiwygService;
  private _modalService: ModalService;
  private _commonAncestorContainer: Node;

  get simpleWysiwygService() { return this._simpleWysiwygService; }
  get modalService() { return this._modalService; }
  get editorContainer() { return this._editorContainer?.nativeElement; }
  get commonAncestorContainer() { return this._commonAncestorContainer; };
  get isSelectionInsideEditorContainer() { return this.editorContainer && this.simpleWysiwygService.isSelectionInside(this.editorContainer); }

  private _mutationObserver: MutationObserver;

  contextMenuPosition = { x: '0px', y: '0px' };
  contextMenuItems: IHtmlEditorContextMenuItem[] = [];

  private _destroy$ = new Subject();

  constructor(
    simpleWysiwygService: SimpleWysiwygService,
    modalService: ModalService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this._simpleWysiwygService = simpleWysiwygService;
    this._modalService = modalService;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this._initContentAndContainer(this.content, this.editorContainer);
    this._observeContainer(this.editorContainer);
    this._subscribeDocumentSelectionChange();
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
    this._mutationObserver?.disconnect();
  }

  private _initContentAndContainer(content: string, container: HTMLDivElement) {
    content = content
      || [
        '<p>',
        '請輸入',
        '<a href="https://www.google.com.tw" target="_blank">',
        '<span><strong>google</strong></span>谷歌</a>',
        '  123  ',
        '<img src="https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230" alt="" width="400" height="210">',
        '  456  ',
        '<img src="https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201810272230" alt="" width="400" height="210">',
        '  789  ',
        '</p>'
      ].join('');

    this.editorContainer.innerHTML = content;

    let childNodes = Array.from(container.childNodes) || [];
    while (childNodes && childNodes.length) {

      childNodes.forEach(node => {
        HtmlEditorElementControllerFactory.addController(node as HTMLElement, this)?.addToEditor(this.editorContainer);
      });

      childNodes = Array.from(childNodes).map(node => Array.from(node.childNodes))
        .reduce((accumulator, currentValue) => {
          return accumulator.concat(currentValue)
        }, []);
    }
  }

  private _subscribeDocumentSelectionChange() {
    fromEvent(document, 'selectionchange').pipe(
      takeUntil(this._destroy$),
    ).subscribe(_ => {
      const range = this.simpleWysiwygService.getRange();
      console.warn('document:selectionchange,  range = ', range);
      if (!this.editorContainer) { return; }
      if (!this.isSelectionInsideEditorContainer) { return; }

      this._commonAncestorContainer = range.commonAncestorContainer;
    });
  }

  private _observeContainer(editorContainer: HTMLDivElement) {
    const mutationObserver = new MutationObserver((records) => {
      console.warn('records = ', records);

      const allAddedNodes = records.map(r => Array.from(r.addedNodes))
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
        .filter((node, i, arr) => arr.indexOf(node) === i);
      console.log('allAddedNodes = ', allAddedNodes);

      const allRemovedNodes = records.map(r => Array.from(r.removedNodes))
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
        .filter((node, i, arr) => arr.indexOf(node) === i);
      console.log('allRemovedNodes = ', allRemovedNodes);

      let acturallyAddedNodes = allAddedNodes
        .filter(node => allRemovedNodes.indexOf(node) < 0)
        .filter(node => editorContainer.contains(node));
      console.log('acturallyAddedNodes = ', acturallyAddedNodes);

      const acturallyRemovedNodes = allRemovedNodes
        .filter(node => allAddedNodes.indexOf(node) < 0)
        .filter(node => !editorContainer.contains(node));
      console.log('acturallyRemovedNodes = ', acturallyRemovedNodes);

      const changedNodes = []
        .concat(allAddedNodes.filter(node => acturallyAddedNodes.indexOf(node) < 0))
        .concat(allRemovedNodes.filter(node => acturallyRemovedNodes.indexOf(node) < 0))
        .concat(records.filter(r => r.type !== 'childList').map(r => r.target))
        .filter((node, i, arr) => arr.indexOf(node) === i);
      console.log('changedNodes = ', changedNodes);

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

    });

    mutationObserver.observe(editorContainer, {
      attributeOldValue: true,
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });

    this._mutationObserver = mutationObserver;
  }

  onClick(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();

    if (ev.target === this.editorContainer) {
      return;
    }

    const target = ev.target as HTMLElement;

    const special =
      this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'img')
      || this.simpleWysiwygService.findTagFromTargetToContainer(this.editorContainer, target, 'iframe');
    if (special) {
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

    if (special) {
      this._openRightClickMenu(ev, special);
      return;
    }
  }

  private _openRightClickMenu(ev: MouseEvent, target: HTMLElement) {
    const contextMenuItems = HtmlEditorElementControllerFactory.getContextMenuItems(target as HTMLElement);
    if (!contextMenuItems?.length) { return; }
    this.simpleWysiwygService.setSelectionOnNode(ev.target as Node);
    const range = this.simpleWysiwygService.getRange();
    this.contextMenuPosition.x = ev.clientX + 'px';
    this.contextMenuPosition.y = ev.clientY + 'px';
    this._editorMenu.menuData = { 'range': range };
    this._editorMenu.menu.focusFirstItem('mouse');
    const subscription = this._editorMenu.onMenuClose.subscribe(_ => {
      subscription.unsubscribe();
      if (!this.simpleWysiwygService.isSelectionInside(this.editorContainer)) {
        this.simpleWysiwygService.restoreSelection(this._editorMenu.menuData['range']);
      }
    });
    this.contextMenuItems = contextMenuItems;
    this._editorMenu.openMenu();
  }

  doAction(action: IHtmlEditorAction) {
    if (!action) { return; }
    if (!this.isSelectionInsideEditorContainer) { return; }

    action.do().subscribe(_ => {

    });
  }
}
