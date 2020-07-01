import { Component, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogFlowMessengerService } from './global/service';
import { RippleScreen } from './global/util/cfx';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'cms-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit, AfterViewInit {

  menus = [];

  constructor(
    private route: ActivatedRoute,
    private dialogFlowMessengerService: DialogFlowMessengerService,
  ) { }
  @ViewChild('MenuContainer') menuContainer: ElementRef;

  ngOnInit(): void {
    this.menus = this.route.snapshot.data.menus;
  }
  ngAfterViewInit(){
    const menuContainerEle = this.menuContainer.nativeElement;
    const rippleFx = new RippleScreen(menuContainerEle);
  }


}
