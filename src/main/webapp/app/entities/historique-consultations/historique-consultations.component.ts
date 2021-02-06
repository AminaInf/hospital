import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoriqueConsultations } from 'app/shared/model/historique-consultations.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HistoriqueConsultationsService } from './historique-consultations.service';
import { HistoriqueConsultationsDeleteDialogComponent } from './historique-consultations-delete-dialog.component';

@Component({
  selector: 'jhi-historique-consultations',
  templateUrl: './historique-consultations.component.html',
})
export class HistoriqueConsultationsComponent implements OnInit, OnDestroy {
  historiqueConsultations: IHistoriqueConsultations[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected historiqueConsultationsService: HistoriqueConsultationsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.historiqueConsultations = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.historiqueConsultationsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IHistoriqueConsultations[]>) => this.paginateHistoriqueConsultations(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.historiqueConsultations = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoriqueConsultations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoriqueConsultations): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoriqueConsultations(): void {
    this.eventSubscriber = this.eventManager.subscribe('historiqueConsultationsListModification', () => this.reset());
  }

  delete(historiqueConsultations: IHistoriqueConsultations): void {
    const modalRef = this.modalService.open(HistoriqueConsultationsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historiqueConsultations = historiqueConsultations;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateHistoriqueConsultations(data: IHistoriqueConsultations[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.historiqueConsultations.push(data[i]);
      }
    }
  }
}
