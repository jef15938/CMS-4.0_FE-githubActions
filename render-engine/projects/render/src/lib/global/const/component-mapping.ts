import { RenderComponentMapping } from '../interface';
import {
  TabDemoComponent, IconPageComponent, SliderComponent, FieldsDemoComponent, GroupTemplateDemoComponent, NewsComponent, LayoutFullComponent, QaComponent, DownloadComponent
} from '../component';
import { LayoutComponent } from '../component/layout/layout.component';
import { HtmlComponent } from '../component/html/html.component';

export const RENDER_DEFAULT_COMPONENT_MAPPINGS: RenderComponentMapping<any>[] = [
  {
    component_id: 'Tab',
    component: TabDemoComponent,
  },
  {
    component_id: 'full',
    component: LayoutFullComponent,
  },
  {
    component_id: 'content-left',
    component: LayoutFullComponent,
  },
  {
    component_id: 'content-margin',
    component: LayoutFullComponent,
  },
  {
    component_id: 'HTML',
    component: HtmlComponent,
  },
  {
    component_id: 'Slide',
    component: SliderComponent,
  },
  {
    component_id: 'News',
    component: NewsComponent,
  },
  {
    component_id: 'QA',
    component: QaComponent,
  },
  {
    component_id: 'Download',
    component: DownloadComponent,
  },
  {
    component_id: 'IconPage',
    component: IconPageComponent,
  },
  {
    component_id: 'FieldsDemo',
    component: FieldsDemoComponent,
  },
  {
    component_id: 'GroupDemo',
    component: GroupTemplateDemoComponent,
  }
];
