import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrdonnances } from 'app/shared/model/ordonnances.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { OrdonnancesService } from './ordonnances.service';
import { OrdonnancesDeleteDialogComponent } from './ordonnances-delete-dialog.component';

@Component({
  selector: 'jhi-ordonnances',
  templateUrl: './ordonnances.component.html',
})
export class OrdonnancesComponent implements OnInit, OnDestroy {
  ordonnances: IOrdonnances[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected ordonnancesService: OrdonnancesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.ordonnances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.ordonnancesService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IOrdonnances[]>) => this.paginateOrdonnances(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.ordonnances = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrdonnances();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrdonnances): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOrdonnances(): void {
    this.eventSubscriber = this.eventManager.subscribe('ordonnancesListModification', () => this.reset());
  }

  delete(ordonnances: IOrdonnances): void {
    const modalRef = this.modalService.open(OrdonnancesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ordonnances = ordonnances;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateOrdonnances(data: IOrdonnances[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.ordonnances.push(data[i]);
      }
    }
  }
}
