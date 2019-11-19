import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/guard/Admin.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'dayoff', loadChildren: () => import('./pages/dayoff/dayoff.module').then(m => m.DayoffModule) },
  { path: 'project', loadChildren: () => import('./pages/project/project/project.module').then(m => m.ProjectModule) },
  { path: 'dayofftype', loadChildren: () => import('./pages/dayofftype/dayofftype.module').then(m => m.DayofftypeModule) },
  // { path: 'profile/:id', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  // { path: 'management', loadChildren: () => import('./pages/management/magement.module').then(m => m.MagementModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
