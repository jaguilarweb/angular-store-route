import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { AdminGuard } from './guards/admin.guard';
/* import { QuicklinkStrategy } from 'ngx-quicklink';
 */
const routes: Routes = [
  /*   { path: '', redirectTo: '/home', pathMatch: 'full' }, */

  {
    path: '',
    loadChildren: () =>
      import('./website/website.module').then((m) => m.WebsiteModule),
    data: { preload: true },
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
/*       preloadingStrategy: PreloadAllModules, */
      /* preloadingStrategy: QuicklinkStrategy,*/
      preloadingStrategy: CustomPreloadService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
