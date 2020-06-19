import { Component } from '@angular/core';
import { RichContentType, RichContent } from './../../../../../../service/dialog-flow.service';
import { RichContentModalComponent } from '../rich-content-modal-base';
import { ChipOptionCreateEditModalComponent } from '../chip-option-create-edit-modal/chip-option-create-edit-modal.component';
import { tap } from 'rxjs/operators';

interface ChipOption {
  text: string;
  image: {
    src: {
      rawUrl: string;
    }
  },
  link: string;
}

interface ChipsContent extends RichContent {
  type: RichContentType.CHIPS;
  options: ChipOption[]
}

@Component({
  selector: 'cms-chips-content-modal',
  templateUrl: './chips-content-modal.component.html',
  styleUrls: ['./chips-content-modal.component.scss']
})
export class ChipsContentModalComponent extends RichContentModalComponent<ChipsContent> {

  title = '建議';

  createNewModel(): ChipsContent {
    return {
      type: RichContentType.CHIPS,
      options: [],
    }
  }

  private arrayMove(arr: any[], beforeIndex: number, afterIndex: number) {
    if (afterIndex >= arr.length) {
      var k = afterIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(afterIndex, 0, arr.splice(beforeIndex, 1)[0]);
    return arr; // for testing
  };

  onListDropped(ev: { currentIndex: number, previousIndex: number }): void {
    const beforeIndex = ev.previousIndex;
    const afterIndex = ev.currentIndex;
    if (beforeIndex === afterIndex) { return; }
    this.arrayMove(this.contentModel.options, beforeIndex, afterIndex);
  }

  addOption() {
    this.createEditOption().subscribe();
  }

  editOption(option: ChipOption) {
    this.createEditOption(option).subscribe();
  }

  removeOption(option: ChipOption) {
    if (!option) { return; }
    const index = this.contentModel.options.indexOf(option);
    if (index > -1) {
      this.contentModel.options.splice(index, 1);
    }
  }

  private createEditOption(option?: ChipOption) {
    return this.modalService.openComponent({
      component: ChipOptionCreateEditModalComponent,
      componentInitData: {
        option
      },
    }).pipe(
      tap((res: ChipOption) => {
        if (res) {
          const index = this.contentModel.options.indexOf(option);
          if (index < 0) { // add
            this.contentModel.options.push(res);
          } else { // edit
            this.contentModel.options.splice(index, 1, res);
          }
        }
      })
    );
  }

}
