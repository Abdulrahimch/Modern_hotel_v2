import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewDashboardComponent } from './newDashboard.component';



const routes: Routes = [
  {
    path: 'main',
    component: NewDashboardComponent
  }

  // {
  //   path: 'edit-booking',
  //   component: EditBookingComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewDashboardRoutingModule { }
