import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './component/web/web.component';
import { CorporateResponsibilityComponent } from './component/corporate-responsibility/corporate-responsibility.component';
import { SliderTypeComponent } from './component/slider-type/slider-type.component';
import { SliderTempComponent } from './component/slider-temp/slider-temp.component';
import { NewsTypeComponent } from './component/news-type/news-type.component';
import { NewsTempComponent } from './component/news-temp/news-temp.component';
import { FormDownloadTypeComponent } from './component/form-download-type/form-download-type.component';
import { FormDownloadTempComponent } from './component/form-download-temp/form-download-temp.component';
import { QaTypeComponent } from './component/qa-type/qa-type.component';
import { QaTempComponent } from './component/qa-temp/qa-temp.component';

@NgModule({
  declarations: [
    WebComponent,
    CorporateResponsibilityComponent,
    SliderTypeComponent,
    SliderTempComponent,
    NewsTypeComponent,
    NewsTempComponent,
    FormDownloadTypeComponent,
    FormDownloadTempComponent,
    QaTypeComponent,
    QaTempComponent,
  ],
  imports: [
    SharedModule,
    WebRoutingModule,
  ]
})
export class WebModule { }
