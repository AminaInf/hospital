import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoriqueConsultations } from 'app/shared/model/historique-consultations.model';
import { HistoriqueConsultationsService } from './historique-consultations.service';

@Component({
  templateUrl: './historique-consultations-delete-dialog.component.html',
})
export class HistoriqueConsultationsDeleteDialogComponent {
  historiqueConsultations?: IHistoriqueConsultations;

  constructor(
    protected historiqueConsultationsService: HistoriqueConsultationsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historiqueConsultationsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historiqueConsultationsListModification');
      this.activeModal.close();
    });
  }
}
