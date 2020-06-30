import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../../ui/modal';

interface ChipOption {
  text: string;
  image: {
    src: {
      rawUrl: string;
    }
  };
  link: string;
}

@Component({
  selector: 'cms-chip-option-create-edit-modal',
  templateUrl: './chip-option-create-edit-modal.component.html',
  styleUrls: ['./chip-option-create-edit-modal.component.scss']
})
export class ChipOptionCreateEditModalComponent extends CustomModalBase implements OnInit {

  title = '建議項目';
  actions: CustomModalActionButton[] = [];

  option: ChipOption;
  optionModel: ChipOption;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.option) {
      this.optionModel = JSON.parse(JSON.stringify(this.option));
    } else {
      this.optionModel = {
        text: '',
        image: {
          src: {
            rawUrl: '',
          }
        },
        link: '',
      };
    }
  }

  confirm() {
    const option = JSON.parse(JSON.stringify(this.optionModel));
    this.close(option);
  }

}
