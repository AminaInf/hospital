import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlanification } from 'app/shared/model/planification.model';
import { PlanificationService } from './planification.service';

@Component({
  templateUrl: './planification-delete-dialog.component.html',
})
export class PlanificationDeleteDialogComponent {
  planification?: IPlanification;

  constructor(
    protected planificationService: PlanificationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.planificationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('planificationListModification');
      this.activeModal.close();
    });
  }
}
