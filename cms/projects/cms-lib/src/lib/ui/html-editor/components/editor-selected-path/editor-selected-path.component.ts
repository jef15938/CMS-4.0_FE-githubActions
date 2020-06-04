import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'cms-editor-selected-path',
  templateUrl: './editor-selected-path.component.html',
  styleUrls: ['./editor-selected-path.component.scss']
})
export class EditorSelectedPathComponent implements OnInit, OnChanges, OnDestroy {

  @Input() editorContainer: HTMLElement;
  @Input() selected: HTMLElement;

  paths: HTMLElement[] = [];

  private _checkPath$ = new Subject<void>();
  private _mutationObserver: MutationObserver;
  private _subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    const subscription = this._checkPath$.pipe(
      debounceTime(350),
      tap(_ => this._checkPath(this.selected))
    ).subscribe();
    this._subscriptions.push(subscription);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._checkPath$.next();
    if (this.editorContainer && !this._mutationObserver) {
      this._mutationObserver = new MutationObserver((records) => {
        this._checkPath$.next();
      });
      this._mutationObserver.observe(this.editorContainer, {
        childList: true,
        subtree: true
      });
    }

  }

  ngOnDestroy(): void {
    this._mutationObserver?.disconnect();
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private _checkPath(selected: HTMLElement): void {
    const paths: HTMLElement[] = [];

    let el = selected;
    while (el) {
      if (el && el.classList.contains('neux-editor')) {
        break;
      }
      paths.unshift(el);
      el = el.parentElement;
    }

    this.paths = paths;
  }

}
