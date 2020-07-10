import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './component/gallery/gallery.component';
import { GallerySharedModule } from '../ui/gallery-shared/gallery-shared.module';

@NgModule({
  imports: [
    SharedModule,
    GalleryRoutingModule,
    GallerySharedModule,
  ],
  declarations: [
    GalleryComponent,
  ],
})
export class GalleryModule { }
