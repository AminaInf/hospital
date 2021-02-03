import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVaccinations } from 'app/shared/model/vaccinations.model';
import { VaccinationsService } from './vaccinations.service';

@Component({
  templateUrl: './vaccinations-delete-dialog.component.html',
})
export class VaccinationsDeleteDialogComponent {
  vaccinations?: IVaccinations;

  constructor(
    protected vaccinationsService: VaccinationsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vaccinationsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('vaccinationsListModification');
      this.activeModal.close();
    });
  }
}
