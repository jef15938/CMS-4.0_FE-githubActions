import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { LayoutModule } from 'layout';
import { FormsModule } from '@angular/forms';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';
import { AddTemplateButtonComponent } from './component/add-template-button/add-template-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { TemplateControlTabComponent } from './component/content-control-panel/control/template/template-control-tab/template-control-tab.component';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FieldControlTextComponent } from './component/content-control-panel/control/field/field-control-text/field-control-text.component';
import { FieldControlTextareaComponent } from './component/content-control-panel/control/field/field-control-textarea/field-control-textarea.component';
import { FieldControlLinkComponent } from './component/content-control-panel/control/field/field-control-link/field-control-link.component';
import { FieldControlBgimgComponent } from './component/content-control-panel/control/field/field-control-bgimg/field-control-bgimg.component';
import { FieldControlImgComponent } from './component/content-control-panel/control/field/field-control-img/field-control-img.component';
import { FieldControlHtmlEditorComponent } from './component/content-control-panel/control/field/field-control-html-editor/field-control-html-editor.component';
import { FieldControlGroupComponent } from './component/content-control-panel/control/field/field-control-group/field-control-group.component';
import { TemplateControlGroupComponent } from './component/content-control-panel/control/template/template-control-group/template-control-group.component';
import { EditorContainerModalComponent } from './component/editor-container-modal/editor-container-modal.component';
import { ContentEditorServiceInjectionToken } from './content-editor.injection-token';
import { ContentEditorService } from './content-editor.service';
import { TemplateControlDataSourceComponent } from './component/content-control-panel/control/template/template-control-data-source/template-control-data-source.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    DragDropModule,
    LayoutModule,
  ],
  declarations: [
    EditorContainerModalComponent,
    ContentEditorComponent,
    LayoutControlPanelComponent,
    ContentControlPanelComponent,
    ContentViewRendererComponent,
    AddTemplateButtonComponent,
    TemplateControlTabComponent,
    TemplateControlGroupComponent,
    FieldControlTextComponent,
    FieldControlTextareaComponent,
    FieldControlLinkComponent,
    FieldControlBgimgComponent,
    FieldControlImgComponent,
    FieldControlHtmlEditorComponent,
    FieldControlGroupComponent,
    TemplateControlDataSourceComponent,
  ],
  exports: [
    // ContentEditorComponent,
  ],
})
export class ContentEditorModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: ContentEditorModule,
      providers: [
        ContentEditorService,
        {
          provide: ContentEditorServiceInjectionToken,
          useClass: ContentEditorService,
        },
      ]
    };
  }
}
