import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_CONFIG_TOKEN, API_HEADER_TOKEN } from '@neux/core';
import { RENDER_COMPONENT_SERVICE_TOKEN, RENDER_COMPONENT_MAPPING_TOKEN } from 'render';
import {
  CmsModule, CMS_ENVIROMENT_TOKEN, CMS_EXTENSION_MENU_RESOLVER_TOKEN
} from '@neux/cms-core';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalHeader } from './global/common/global-header';
import { DynamicComponentFactoryService } from './global/service/dynamic-component-factory.service';
import { MenuService } from './global/service/menu.service';
import { COMPONENT_MAPPINGS } from './global/common/component-mapping';
import { FarmCustomFormControlComponent } from './function/farm-custom-form-control/farm-custom-form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FarmCustomFormControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CmsModule.forRoot(),
  ],
  providers: [
    { provide: CMS_ENVIROMENT_TOKEN, useValue: environment },
    { provide: CMS_EXTENSION_MENU_RESOLVER_TOKEN, useClass: MenuService },
    { provide: RENDER_COMPONENT_MAPPING_TOKEN, useValue: COMPONENT_MAPPINGS },
    { provide: API_CONFIG_TOKEN, useValue: environment },
    { provide: API_HEADER_TOKEN, useExisting: GlobalHeader },
    { provide: RENDER_COMPONENT_SERVICE_TOKEN, useExisting: DynamicComponentFactoryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
