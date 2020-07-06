import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogFlowMessengerService } from './global/service';
import { RippleScreen } from './global/util/cfx';
import { AuthorizationService } from './global/api/service';

@Component({
  selector: 'cms-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit, AfterViewInit {

  @ViewChild('MenuContainer') menuContainer: ElementRef;

  menus = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private dialogFlowMessengerService: DialogFlowMessengerService,
  ) { }

  ngOnInit(): void {
    this.menus = this.activatedRoute.snapshot.data.menus;
  }

  ngAfterViewInit() {
    const menuContainerEle = this.menuContainer.nativeElement;
    const rippleFx = new RippleScreen(menuContainerEle);
  }

  logout() {
    this.authorizationService.logout().subscribe();
  }

}
