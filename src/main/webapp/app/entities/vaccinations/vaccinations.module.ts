import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalSharedModule } from 'app/shared/shared.module';
import { VaccinationsComponent } from './vaccinations.component';
import { VaccinationsDetailComponent } from './vaccinations-detail.component';
import { VaccinationsUpdateComponent } from './vaccinations-update.component';
import { VaccinationsDeleteDialogComponent } from './vaccinations-delete-dialog.component';
import { vaccinationsRoute } from './vaccinations.route';

@NgModule({
  imports: [HospitalSharedModule, RouterModule.forChild(vaccinationsRoute)],
  declarations: [VaccinationsComponent, VaccinationsDetailComponent, VaccinationsUpdateComponent, VaccinationsDeleteDialogComponent],
  entryComponents: [VaccinationsDeleteDialogComponent],
})
export class HospitalVaccinationsModule {}
