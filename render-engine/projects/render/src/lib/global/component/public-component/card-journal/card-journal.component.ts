import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdr-card-journal',
  templateUrl: './card-journal.component.html',
  styleUrls: ['./card-journal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardJournalComponent implements OnInit {

  constructor() { }

  exampleText: string;

  ngOnInit(): void {
    this.exampleText = '美國、義大利、西班牙，相繼傳出社區擴大感染的疫情，面對未來必要的防護措施不可少。更重要的是，你我務必配合政府的防疫宣導，做好自我健康管理，才能減少病毒傳播，安然度過這波疫情asdfsdfdsgfsdhbgksghsdhfgbkvshjdfg。 本期邀請多位醫師與專家分享、如何增強身體自身免疫力及防範傳染病的方法。';
  }

}
