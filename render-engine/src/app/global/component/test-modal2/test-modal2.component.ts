import { Component, OnInit } from '@angular/core';
import { ModalBase, ModalSevice } from '@neux/render';

@Component({
  selector: 'rdr-test-modal2',
  templateUrl: './test-modal2.component.html',
  styleUrls: ['./test-modal2.component.scss']
})
export class TestModal2Component extends ModalBase<any> implements OnInit {

  constructor(
    private modalSevice: ModalSevice,
  ) { super(); }

  ngOnInit(): void { }

  confirm() {
    this.modalSevice.closeAll();
  }

}
