import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rdr-index-consultant',
  templateUrl: './index-consultant.component.html',
  styleUrls: ['./index-consultant.component.scss']
})
export class IndexConsultantComponent implements OnInit {

  consultantList: Array<{ name: string, seniority: number, rank: number, area: string }> = [
    { name: '吳素芬', seniority: 5, rank: 4.9, area: '台南市' },
    { name: '蔡昌明', seniority: 25, rank: 4, area: '台中市' },
    { name: '楊謹綾', seniority: 15, rank: 5, area: '台北市' },
    { name: '鄭鈞薇', seniority: 8, rank: 4, area: '嘉義市' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
