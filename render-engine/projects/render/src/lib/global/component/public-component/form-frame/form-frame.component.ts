import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdr-form-frame',
  templateUrl: './form-frame.component.html',
  styleUrls: ['./form-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFrameComponent implements OnInit, AfterViewInit {

  @ViewChild('error') errorContent: ElementRef;

  @Input() inline = false;
  @Input() title = '標題';
  @Input() suffix: string;
  @Input() note: string;

  errorHide = true;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (!this.errorContent.nativeElement.hasChildNodes()) {
      this.errorContent.nativeElement.style.display = 'none';
    }
  }
}
