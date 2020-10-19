import { Component, OnInit, Input } from '@angular/core';
import { MenuInfoModel } from '../api/data-model/models/menu-info.model';

@Component({
  selector: 'cms-menu-node',
  templateUrl: './menu-node.component.html',
  styleUrls: ['./menu-node.component.scss']
})
export class MenuNodeComponent implements OnInit {

  @Input() isAppMenu = false;
  @Input() menu: MenuInfoModel;
  @Input() category = '';

  constructor() { }

  ngOnInit(): void { }

}

