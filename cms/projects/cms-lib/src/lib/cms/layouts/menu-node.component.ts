import { Component, OnInit, Input } from '@angular/core';
import { MenuInfo } from '../../neuxAPI/bean/MenuInfo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-menu-node',
  templateUrl: './menu-node.component.html',
  styleUrls: ['./menu-node.component.scss']
})
export class MenuNodeComponent implements OnInit {

  @Input() menu: MenuInfo;
  @Input() category = '';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  navigate() {
    const routes = this.menu.func_id.split('/');
    this._router.navigate([this.category, ...routes]);
  }

}