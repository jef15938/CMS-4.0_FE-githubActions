import { RenderComponentMapping } from '../interface/render-component-mapping.interface';
import { HtmlComponent } from '../component/html/html.component';
import { BannerComponent } from '../component/banner/banner.component';
import { ListComponent } from '../component/list/list.component';
import { FixedWrapperComponent } from '../component/fixed-wrapper/fixed-wrapper.component';
import { TabCarouselTemplateComponent } from '../component/tab-carousel-template/tab-carousel-template.component';
import { TabScrollableTemplateComponent } from '../component/tab-scrollable-template/tab-scrollable-template.component';
import { LayoutFullComponent } from '../component/layout-full/layout-full.component';
import { SliderComponent } from '../component/slider/slider.component';
import { NewsComponent } from '../component/news/news.component';
import { QaComponent } from '../component/qa/qa.component';
import { DownloadComponent } from '../component/download/download.component';
import { IconPageComponent } from '../component/icon-page/icon-page.component';
import { FieldsDemoComponent } from '../component/fields-demo/fields-demo.component';
import { GroupTemplateDemoComponent } from '../component/group-template-demo/group-template-demo.component';
import { TestCustomize1Component } from '../component/test-customize1/test-customize1.component';
import { SocialMediaComponent } from '../component/social-media/social-media.component';

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
