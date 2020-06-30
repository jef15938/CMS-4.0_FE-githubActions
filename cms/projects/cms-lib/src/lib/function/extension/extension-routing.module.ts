import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtensionComponent } from './component/extension.component';


const routes: Routes = [
  {
    path: ':funcId', component: ExtensionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionRoutingModule { }
