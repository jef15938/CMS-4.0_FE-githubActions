import { Component, OnInit, Input } from '@angular/core';
import { MenuInfo } from '../api/neuxAPI/bean/MenuInfo';

@Component({
  selector: 'cms-menu-node',
  templateUrl: './menu-node.component.html',
  styleUrls: ['./menu-node.component.scss']
})
export class MenuNodeComponent implements OnInit {

  @Input() isAppMenu = false;
  @Input() menu: MenuInfo;
  @Input() category = '';

  constructor() { }

  ngOnInit(): void { }

}

