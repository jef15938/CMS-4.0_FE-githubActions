import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './component/web/web.component';
import { CorporateResponsibilityComponent } from './component/corporate-responsibility/corporate-responsibility.component';
import { QaTempComponent } from './component/qa-temp/qa-temp.component';
import { QaTypeComponent } from './component/qa-type/qa-type.component';
import { NewsTempComponent } from './component/news-temp/news-temp.component';
import { NewsTypeComponent } from './component/news-type/news-type.component';
import { SliderTempComponent } from './component/slider-temp/slider-temp.component';
import { SliderTypeComponent } from './component/slider-type/slider-type.component';
import { FormDownloadTempComponent } from './component/form-download-temp/form-download-temp.component';
import { FormDownloadTypeComponent } from './component/form-download-type/form-download-type.component';

const routes: Routes = [
  {
    path: '', component: WebComponent,
    children: [
      {
        path: 'qa-temp', component: QaTempComponent
      },
      {
        path: 'qa-type', component: QaTypeComponent
      },
      {
        path: 'news-temp', component: NewsTempComponent,
      },
      {
        path: 'news-type', component: NewsTypeComponent,
      },
      {
        path: 'slider-temp', component: SliderTempComponent,
      },
      {
        path: 'slider-type', component: SliderTypeComponent
      },
      {
        path: 'form-download-temp', component: FormDownloadTempComponent
      },
      {
        path: 'form-download-type', component: FormDownloadTypeComponent
      },
      {
        path: 'corporate-responsibility', component: CorporateResponsibilityComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
