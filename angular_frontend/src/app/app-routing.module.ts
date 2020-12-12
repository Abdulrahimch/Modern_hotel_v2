import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  // },
  {
    path: 'new-dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./newDashboard/newDashboard.module').then(m => m.NewDashboardModule)
  },
  // {
  //   path: 'email',
  //   loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
  // },
  {
    path: 'booking',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./booking/booking.module').then(m => m.BookingModule)
  },
  // {
  //   path: 'rooms',
  //   loadChildren: () =>
  //     import('./rooms/rooms.module').then(m => m.RoomModule)
  // },
  // {
  //   path: 'departments',
  //   loadChildren: () =>
  //     import('./departments/departments.module').then(m => m.DepartmentsModule)
  // },
  {
    path: 'staff',
    canActivate: [AuthGuard],
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'apps',
    canActivate: [AuthGuard],
    loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  // {
  //   path: 'widget',
  //   loadChildren: () =>
  //     import('./widget/widget.module').then(m => m.WidgetModule)
  // },
  // {
  //   path: 'ui',
  //   loadChildren: () => import('./ui/ui.module').then(m => m.UiModule)
  // },
  // {
  //   path: 'forms',
  //   loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
  // },
  // {
  //   path: 'tables',
  //   loadChildren: () =>
  //     import('./tables/tables.module').then(m => m.TablesModule)
  // },
  // {
  //   path: 'media',
  //   loadChildren: () => import('./media/media.module').then(m => m.MediaModule)
  // },
  // {
  //   path: 'charts',
  //   loadChildren: () =>
  //     import('./charts/charts.module').then(m => m.ChartsModule)
  // },
  // {
  //   path: 'timeline',
  //   loadChildren: () =>
  //     import('./timeline/timeline.module').then(m => m.TimelineModule)
  // },
  // {
  //   path: 'icons',
  //   loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
  // },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        m => m.AuthenticationModule
      )
  },
  // {
  //   path: 'extra-pages',
  //   loadChildren: () =>
  //     import('./extra-pages/extra-pages.module').then(m => m.ExtraPagesModule)
  // },
  // {
  //   path: 'maps',
  //   loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  // },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
