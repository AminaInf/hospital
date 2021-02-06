import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalSharedModule } from 'app/shared/shared.module';
import { OrdonnancesComponent } from './ordonnances.component';
import { OrdonnancesDetailComponent } from './ordonnances-detail.component';
import { OrdonnancesUpdateComponent } from './ordonnances-update.component';
import { OrdonnancesDeleteDialogComponent } from './ordonnances-delete-dialog.component';
import { ordonnancesRoute } from './ordonnances.route';

@NgModule({
  imports: [HospitalSharedModule, RouterModule.forChild(ordonnancesRoute)],
  declarations: [OrdonnancesComponent, OrdonnancesDetailComponent, OrdonnancesUpdateComponent, OrdonnancesDeleteDialogComponent],
  entryComponents: [OrdonnancesDeleteDialogComponent],
})
export class HospitalOrdonnancesModule {}
