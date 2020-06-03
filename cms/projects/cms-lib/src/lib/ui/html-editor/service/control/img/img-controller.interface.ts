import { Subject } from 'rxjs';

export interface IImgController {
  imgChange$: Subject<HTMLImageElement>;
  consoleImgInfo(img: HTMLImageElement): void;
}