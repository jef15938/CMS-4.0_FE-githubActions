import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './cms.component';
import { CmsUserMenuResolver, CmsAuthGuard } from './service';
import { LoginModule } from './login/login.module';
import { MultiSiteModule } from './function-module/multi-site/multi-site.module';
import { MyAuditingModule } from './function-module/my-auditing/my-auditing.module';
import { GalleryModule } from './function-module/gallery/gallery.module';
import { AuditingModule } from './function-module/auditing/auditing.module';
import { SystemModule } from './function-module/system/system.module';
import { WebModule } from './function-module/web/web.module';
import { ExtensionModule } from './function-module/extension/extension.module';
import { ChatbotModule } from './function-module/chatbot/chatbot.module';

export function getMultiSiteModule() { return MultiSiteModule; }
export function getMyAuditingModule() { return MyAuditingModule; }
export function getGalleryModule() { return GalleryModule; }
export function getAuditingModule() { return AuditingModule; }
export function getSystemModule() { return SystemModule; }
export function getWebModule() { return WebModule; }
export function getChatbotModule() { return ChatbotModule; }
export function getExtensionModule() { return ExtensionModule; }
export function getLoginModule() { return LoginModule; }

const routes: Routes = [
  {
    path: '', component: CmsComponent, resolve: { menus: CmsUserMenuResolver }, canActivate: [CmsAuthGuard],
    children: [
      {
        path: 'multi-site',
        // loadChildren: () => import('./function-module/multi-site/multi-site.module').then(m => m.MultiSiteModule)
        loadChildren: getMultiSiteModule
      },
      {
        path: 'my-auditing',
        // loadChildren: () => import('./function-module/my-auditing/my-auditing.module').then(m => m.MyAuditingModule)
        loadChildren: getMyAuditingModule
      },
      {
        path: 'gallery',
        // loadChildren: () => import('./function-module/gallery/gallery.module').then(m => m.GalleryModule)
        loadChildren: getGalleryModule
      },
      {
        path: 'auditing',
        // loadChildren: () => import('./function-module/auditing/auditing.module').then(m => m.AuditingModule)
        loadChildren: getAuditingModule
      },
      {
        path: 'system',
        // loadChildren: () => import('./function-module/system/system.module').then(m => m.SystemModule)
        loadChildren: getSystemModule
      },
      {
        path: 'web',
        // loadChildren: () => import('./function-module/web/web.module').then(m => m.WebModule)
        loadChildren: getWebModule
      },
      {
        path: 'chatbot',
        // loadChildren: () => import('./function-module/chatbot/chatbot.module').then(m => m.ChatbotModule)
        loadChildren: getChatbotModule
      },
      {
        path: 'extension',
        // loadChildren: () => import('./function-module/extension/extension.module').then(m => m.ExtensionModule)
        loadChildren: getExtensionModule
      }
    ]
  },
  {
    path: 'login',
    // loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    loadChildren: getLoginModule
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
