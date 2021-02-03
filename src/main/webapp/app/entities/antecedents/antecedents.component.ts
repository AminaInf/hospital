import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAntecedents } from 'app/shared/model/antecedents.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AntecedentsService } from './antecedents.service';
import { AntecedentsDeleteDialogComponent } from './antecedents-delete-dialog.component';

@Component({
  selector: 'jhi-antecedents',
  templateUrl: './antecedents.component.html',
})
export class AntecedentsComponent implements OnInit, OnDestroy {
  antecedents: IAntecedents[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected antecedentsService: AntecedentsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.antecedents = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.antecedentsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IAntecedents[]>) => this.paginateAntecedents(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.antecedents = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAntecedents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAntecedents): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAntecedents(): void {
    this.eventSubscriber = this.eventManager.subscribe('antecedentsListModification', () => this.reset());
  }

  delete(antecedents: IAntecedents): void {
    const modalRef = this.modalService.open(AntecedentsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.antecedents = antecedents;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAntecedents(data: IAntecedents[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.antecedents.push(data[i]);
      }
    }
  }
}
