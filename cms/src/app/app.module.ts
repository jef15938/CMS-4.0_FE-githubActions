import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ConfigToken, RestHeaderToken } from '@neux/core';
import { environment } from 'src/environments/environment';
import { GlobalHeader } from './common/global-header';
import { CmsLibModule } from 'projects/cms-lib/src/lib/cms-lib.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { COMPONENT_SERVICE_TOKEN } from 'layout';
import { DynamicComponentFactoryService } from './service/dynamic-component-factory.service';
import { CmsExtensionMenuResolver, CmsExtensionComponentMappings } from 'projects/cms-lib/src/lib/cms-lib.injection-token';
import { MenuService } from './service/menu.service';
import { ExtensionMappings } from './app.extension-mapping';
import { CmsModule } from 'projects/cms-lib/src/lib/cms/cms.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CmsModule.forRoot(),
    CmsLibModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: CmsExtensionMenuResolver, useClass: MenuService },
    { provide: CmsExtensionComponentMappings, useValue: ExtensionMappings },
    { provide: ConfigToken, useValue: environment },
    { provide: RestHeaderToken, useExisting: GlobalHeader },
    { provide: COMPONENT_SERVICE_TOKEN, useExisting: DynamicComponentFactoryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
