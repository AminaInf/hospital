import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalSharedModule } from 'app/shared/shared.module';
import { AntecedentsComponent } from './antecedents.component';
import { AntecedentsDetailComponent } from './antecedents-detail.component';
import { AntecedentsUpdateComponent } from './antecedents-update.component';
import { AntecedentsDeleteDialogComponent } from './antecedents-delete-dialog.component';
import { antecedentsRoute } from './antecedents.route';

@NgModule({
  imports: [HospitalSharedModule, RouterModule.forChild(antecedentsRoute)],
  declarations: [AntecedentsComponent, AntecedentsDetailComponent, AntecedentsUpdateComponent, AntecedentsDeleteDialogComponent],
  entryComponents: [AntecedentsDeleteDialogComponent],
})
export class HospitalAntecedentsModule {}
