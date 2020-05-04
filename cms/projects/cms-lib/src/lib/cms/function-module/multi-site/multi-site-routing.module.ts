import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiSiteComponent } from './multi-site.component';

const routes: Routes = [
  {
    path: '', component: MultiSiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiSiteRoutingModule { }
