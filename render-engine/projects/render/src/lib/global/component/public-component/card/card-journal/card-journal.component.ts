import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';
import { CardJournalData } from './card-journal.interface';

@Component({
  selector: 'rdr-card-journal',
  templateUrl: './card-journal.component.html',
  styleUrls: ['./card-journal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardJournalComponent extends CustomizeBaseDirective implements OnInit {

  @Input() cardJournalData: CardJournalData;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {

  }

}
