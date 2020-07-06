import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WrapperModule } from 'render';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';
import { AddTemplateButtonComponent } from './component/add-template-button/add-template-button.component';
import { TemplateControlTabComponent } from './component/content-control-panel/control/template/template-control-tab/template-control-tab.component';
import { ContentEditorComponent } from './content-editor.component';
import { FieldControlTextComponent } from './component/content-control-panel/control/field/field-control-text/field-control-text.component';
import { FieldControlTextareaComponent } from './component/content-control-panel/control/field/field-control-textarea/field-control-textarea.component';
import { FieldControlLinkComponent } from './component/content-control-panel/control/field/field-control-link/field-control-link.component';
import { FieldControlBgimgComponent } from './component/content-control-panel/control/field/field-control-bgimg/field-control-bgimg.component';
import { FieldControlImgComponent } from './component/content-control-panel/control/field/field-control-img/field-control-img.component';
import { FieldControlHtmlEditorComponent } from './component/content-control-panel/control/field/field-control-html-editor/field-control-html-editor.component';
import { FieldControlGroupComponent } from './component/content-control-panel/control/field/field-control-group/field-control-group.component';
import { TemplateControlGroupComponent } from './component/content-control-panel/control/template/template-control-group/template-control-group.component';
import { ContentEditorContainerModalComponent } from './component/content-editor-container-modal/content-editor-container-modal.component';
import { TemplateControlDataSourceComponent } from './component/content-control-panel/control/template/template-control-data-source/template-control-data-source.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    DragDropModule,
    WrapperModule,
  ],
  declarations: [
    ContentEditorContainerModalComponent,
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
}
