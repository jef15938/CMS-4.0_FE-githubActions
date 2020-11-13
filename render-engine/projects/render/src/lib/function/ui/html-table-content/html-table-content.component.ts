import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'rdr-html-table-content',
  templateUrl: './html-table-content.component.html',
  styleUrls: ['./html-table-content.component.scss']
})
export class HtmlTableContentComponent implements AfterViewInit {

  @ViewChild('Content') content: ElementRef<HTMLDivElement>;
  @Input() table: HTMLTableElement;

  constructor() { }

  ngAfterViewInit(): void {
    this.content.nativeElement.appendChild(this.table);
  }

}
