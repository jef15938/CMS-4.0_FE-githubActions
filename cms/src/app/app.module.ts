import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_CONFIG_TOKEN, API_HEADER_TOKEN } from '@neux/core';
import { COMPONENT_SERVICE_TOKEN } from 'render';
import {
  CmsModule, CMS_ENVIROMENT, CMS_EXTENSION_MENU_RESOLVER, CMS_EXTENSION_COMPONENT_MAPPINGS
} from '@neux/cms-core';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalHeader } from './global/common/global-header';
import { DynamicComponentFactoryService } from './global/service/dynamic-component-factory.service';
import { MenuService } from './global/service/menu.service';
import { EXTENSION_MAPPINGS } from './global/common/app.extension-mapping';
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
    { provide: CMS_ENVIROMENT, useValue: environment },
    { provide: CMS_EXTENSION_MENU_RESOLVER, useClass: MenuService },
    { provide: CMS_EXTENSION_COMPONENT_MAPPINGS, useValue: EXTENSION_MAPPINGS },
    { provide: API_CONFIG_TOKEN, useValue: environment },
    { provide: API_HEADER_TOKEN, useExisting: GlobalHeader },
    { provide: COMPONENT_SERVICE_TOKEN, useExisting: DynamicComponentFactoryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
