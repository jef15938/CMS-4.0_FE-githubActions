import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogFlowMessengerService } from './service/dialog-flow.service';

@Component({
  selector: 'cms-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  menus = [];

  constructor(
    private route: ActivatedRoute,
    private dialogFlowMessengerService: DialogFlowMessengerService,
  ) { }

  ngOnInit(): void {
    this.menus = this.route.snapshot.data.menus;
  }

}
