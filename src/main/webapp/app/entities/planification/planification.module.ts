import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalSharedModule } from 'app/shared/shared.module';
import { PlanificationComponent } from './planification.component';
import { PlanificationDetailComponent } from './planification-detail.component';
import { PlanificationUpdateComponent } from './planification-update.component';
import { PlanificationDeleteDialogComponent } from './planification-delete-dialog.component';
import { planificationRoute } from './planification.route';

@NgModule({
  imports: [HospitalSharedModule, RouterModule.forChild(planificationRoute)],
  declarations: [PlanificationComponent, PlanificationDetailComponent, PlanificationUpdateComponent, PlanificationDeleteDialogComponent],
  entryComponents: [PlanificationDeleteDialogComponent],
})
export class HospitalPlanificationModule {}
