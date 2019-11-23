import { ProjectAdminModule } from './pages/project-admin/project-admin.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/guard/Admin.guard';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { NoGuardService } from './core/guard/no-guard.service';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule), canLoad: [AuthGuardService]},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canLoad: [NoGuardService] },
  { path: 'dayoff', loadChildren: () => import('./pages/dayoff/dayoff.module').then(m => m.DayoffModule) },
  { path: 'project-admin', loadChildren: () => import('./pages/project-admin/project-admin.module').then(m => m.ProjectAdminModule) },
  { path: 'project', loadChildren: () => import('./pages/project/project/project.module').then(m => m.ProjectModule) },
  { path: 'project-detal', loadChildren: () => import('./pages/project-detail/project-detail.module').then(m => m.ProjectDetailModule) },
  { path: 'dayofftype', loadChildren: () => import('./pages/dayofftype/dayofftype.module').then(m => m.DayofftypeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
