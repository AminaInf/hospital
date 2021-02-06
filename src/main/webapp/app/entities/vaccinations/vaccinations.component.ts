import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVaccinations } from 'app/shared/model/vaccinations.model';
import { VaccinationsService } from './vaccinations.service';
import { VaccinationsDeleteDialogComponent } from './vaccinations-delete-dialog.component';

@Component({
  selector: 'jhi-vaccinations',
  templateUrl: './vaccinations.component.html',
})
export class VaccinationsComponent implements OnInit, OnDestroy {
  vaccinations?: IVaccinations[];
  eventSubscriber?: Subscription;

  constructor(
    protected vaccinationsService: VaccinationsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.vaccinationsService.query().subscribe((res: HttpResponse<IVaccinations[]>) => (this.vaccinations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVaccinations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVaccinations): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVaccinations(): void {
    this.eventSubscriber = this.eventManager.subscribe('vaccinationsListModification', () => this.loadAll());
  }

  delete(vaccinations: IVaccinations): void {
    const modalRef = this.modalService.open(VaccinationsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vaccinations = vaccinations;
  }
}
