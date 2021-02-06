import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdonnances } from 'app/shared/model/ordonnances.model';
import { OrdonnancesService } from './ordonnances.service';

@Component({
  templateUrl: './ordonnances-delete-dialog.component.html',
})
export class OrdonnancesDeleteDialogComponent {
  ordonnances?: IOrdonnances;

  constructor(
    protected ordonnancesService: OrdonnancesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ordonnancesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ordonnancesListModification');
      this.activeModal.close();
    });
  }
}
