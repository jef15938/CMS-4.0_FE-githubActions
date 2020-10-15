import { RenderComponentMapping } from '../interface';
import {
  TabScrollableTemplateComponent, TabCarouselTemplateComponent, IconPageComponent, SliderComponent, FieldsDemoComponent, GroupTemplateDemoComponent,
  NewsComponent, LayoutFullComponent, QaComponent, DownloadComponent, FixedWrapperComponent, TestCustomize1Component, SocialMediaComponent
} from '../component';
import { HtmlComponent } from '../component/html/html.component';
import { BannerComponent } from '../component/banner/banner.component';
import { ListComponent } from '../component/list/list.component';

export const RENDER_DEFAULT_COMPONENT_MAPPINGS: RenderComponentMapping<any>[] = [
  {
    component_id: 'FixedWrapper',
    component: FixedWrapperComponent,
  },
  {
    component_id: 'Tab',
    component: TabCarouselTemplateComponent,
  },
  {
    component_id: 'Tab',
    component: TabScrollableTemplateComponent,
  },
  {
    component_id: 'fixed-demo-1',
    component: LayoutFullComponent,
  },
  {
    component_id: 'portal-index',
    component: LayoutFullComponent,
  },
  {
    component_id: 'portal-layout1',
    component: LayoutFullComponent,
  },
  {
    component_id: 'portal-layout2',
    component: LayoutFullComponent,
  },
  {
    component_id: 'portal-oversea_calc',
    component: LayoutFullComponent,
  },
  {
    component_id: 'portal-product-detail',
    component: LayoutFullComponent,
  },
  {
    component_id: 'portal-product-list',
    component: LayoutFullComponent,
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
    component_id: 'slider',
    component: SliderComponent,
  },
  {
    component_id: 'news',
    component: NewsComponent,
  },
  {
    component_id: 'qa',
    component: QaComponent,
  },
  {
    component_id: 'download',
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
  },
  {
    component_id: 'qa',
    component: QaComponent,
  },
  {
    component_id: 'banner',
    component: BannerComponent,
  },
  {
    component_id: 'list',
    component: ListComponent,
  },
  {
    component_id: 'test_customize1',
    component: TestCustomize1Component,
  },
  {
    component_id: 'social-media',
    component: SocialMediaComponent,
  },
];
