import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExamensBiologiques } from 'app/shared/model/examens-biologiques.model';
import { ExamensBiologiquesService } from './examens-biologiques.service';

@Component({
  templateUrl: './examens-biologiques-delete-dialog.component.html',
})
export class ExamensBiologiquesDeleteDialogComponent {
  examensBiologiques?: IExamensBiologiques;

  constructor(
    protected examensBiologiquesService: ExamensBiologiquesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.examensBiologiquesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('examensBiologiquesListModification');
      this.activeModal.close();
    });
  }
}
