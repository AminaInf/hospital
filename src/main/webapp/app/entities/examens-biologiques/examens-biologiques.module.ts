import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalSharedModule } from 'app/shared/shared.module';
import { ExamensBiologiquesComponent } from './examens-biologiques.component';
import { ExamensBiologiquesDetailComponent } from './examens-biologiques-detail.component';
import { ExamensBiologiquesUpdateComponent } from './examens-biologiques-update.component';
import { ExamensBiologiquesDeleteDialogComponent } from './examens-biologiques-delete-dialog.component';
import { examensBiologiquesRoute } from './examens-biologiques.route';

@NgModule({
  imports: [HospitalSharedModule, RouterModule.forChild(examensBiologiquesRoute)],
  declarations: [
    ExamensBiologiquesComponent,
    ExamensBiologiquesDetailComponent,
    ExamensBiologiquesUpdateComponent,
    ExamensBiologiquesDeleteDialogComponent,
  ],
  entryComponents: [ExamensBiologiquesDeleteDialogComponent],
})
export class HospitalExamensBiologiquesModule {}
