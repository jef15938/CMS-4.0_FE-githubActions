import { Component, OnInit } from '@angular/core';
import { ModalBase, ModalSevice } from '@neux/render';
import { TestModal2Component } from '../test-modal2/test-modal2.component';

@Component({
  selector: 'rdr-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent extends ModalBase<any> implements OnInit {

  constructor(
    private modalSevice: ModalSevice,
  ) { super(); }

  ngOnInit(): void { }

  confirm() {
    this.close(333);
  }

  openModal2() {
    this.modalSevice.openComponent(TestModal2Component).subscribe();
  }

}
