import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigToken, RestHeaderToken } from '@neux/core';
import { COMPONENT_SERVICE_TOKEN } from 'layout';
import {
  CmsModule, CMS_ENVIROMENT, CMS_EXTENSION_MENU_RESOLVER, CMS_EXTENSION_COMPONENT_MAPPINGS
} from '@neux/cms-core';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GlobalHeader } from './common/global-header';
import { DynamicComponentFactoryService } from './service/dynamic-component-factory.service';
import { MenuService } from './service/menu.service';
import { EXTENSION_MAPPINGS } from './app.extension-mapping';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CmsModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: CMS_ENVIROMENT, useValue: environment },
    { provide: CMS_EXTENSION_MENU_RESOLVER, useClass: MenuService },
    { provide: CMS_EXTENSION_COMPONENT_MAPPINGS, useValue: EXTENSION_MAPPINGS },
    { provide: ConfigToken, useValue: environment },
    { provide: RestHeaderToken, useExisting: GlobalHeader },
    { provide: COMPONENT_SERVICE_TOKEN, useExisting: DynamicComponentFactoryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
