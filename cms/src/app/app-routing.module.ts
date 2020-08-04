import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsModule } from '@neux/cms-core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => CmsModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
