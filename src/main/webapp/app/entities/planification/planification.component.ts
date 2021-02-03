import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlanification } from 'app/shared/model/planification.model';
import { PlanificationService } from './planification.service';
import { PlanificationDeleteDialogComponent } from './planification-delete-dialog.component';

@Component({
  selector: 'jhi-planification',
  templateUrl: './planification.component.html',
})
export class PlanificationComponent implements OnInit, OnDestroy {
  planifications?: IPlanification[];
  eventSubscriber?: Subscription;

  constructor(
    protected planificationService: PlanificationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.planificationService.query().subscribe((res: HttpResponse<IPlanification[]>) => (this.planifications = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPlanifications();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPlanification): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPlanifications(): void {
    this.eventSubscriber = this.eventManager.subscribe('planificationListModification', () => this.loadAll());
  }

  delete(planification: IPlanification): void {
    const modalRef = this.modalService.open(PlanificationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.planification = planification;
  }
}
