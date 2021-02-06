import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAntecedents } from 'app/shared/model/antecedents.model';
import { AntecedentsService } from './antecedents.service';

@Component({
  templateUrl: './antecedents-delete-dialog.component.html',
})
export class AntecedentsDeleteDialogComponent {
  antecedents?: IAntecedents;

  constructor(
    protected antecedentsService: AntecedentsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.antecedentsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('antecedentsListModification');
      this.activeModal.close();
    });
  }
}
