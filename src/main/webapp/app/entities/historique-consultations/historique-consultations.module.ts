import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalSharedModule } from 'app/shared/shared.module';
import { HistoriqueConsultationsComponent } from './historique-consultations.component';
import { HistoriqueConsultationsDetailComponent } from './historique-consultations-detail.component';
import { HistoriqueConsultationsUpdateComponent } from './historique-consultations-update.component';
import { HistoriqueConsultationsDeleteDialogComponent } from './historique-consultations-delete-dialog.component';
import { historiqueConsultationsRoute } from './historique-consultations.route';

@NgModule({
  imports: [HospitalSharedModule, RouterModule.forChild(historiqueConsultationsRoute)],
  declarations: [
    HistoriqueConsultationsComponent,
    HistoriqueConsultationsDetailComponent,
    HistoriqueConsultationsUpdateComponent,
    HistoriqueConsultationsDeleteDialogComponent,
  ],
  entryComponents: [HistoriqueConsultationsDeleteDialogComponent],
})
export class HospitalHistoriqueConsultationsModule {}
