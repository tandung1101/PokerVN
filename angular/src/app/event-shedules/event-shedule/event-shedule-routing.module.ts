import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventSheduleComponent } from './components/event-shedule.component';

const routes: Routes = [
  {
    path: '',
    component: EventSheduleComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventSheduleRoutingModule {}
