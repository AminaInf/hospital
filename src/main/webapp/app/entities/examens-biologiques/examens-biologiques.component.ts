import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExamensBiologiques } from 'app/shared/model/examens-biologiques.model';
import { ExamensBiologiquesService } from './examens-biologiques.service';
import { ExamensBiologiquesDeleteDialogComponent } from './examens-biologiques-delete-dialog.component';

@Component({
  selector: 'jhi-examens-biologiques',
  templateUrl: './examens-biologiques.component.html',
})
export class ExamensBiologiquesComponent implements OnInit, OnDestroy {
  examensBiologiques?: IExamensBiologiques[];
  eventSubscriber?: Subscription;

  constructor(
    protected examensBiologiquesService: ExamensBiologiquesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.examensBiologiquesService
      .query()
      .subscribe((res: HttpResponse<IExamensBiologiques[]>) => (this.examensBiologiques = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExamensBiologiques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExamensBiologiques): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExamensBiologiques(): void {
    this.eventSubscriber = this.eventManager.subscribe('examensBiologiquesListModification', () => this.loadAll());
  }

  delete(examensBiologiques: IExamensBiologiques): void {
    const modalRef = this.modalService.open(ExamensBiologiquesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.examensBiologiques = examensBiologiques;
  }
}
