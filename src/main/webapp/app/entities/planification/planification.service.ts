import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlanification } from 'app/shared/model/planification.model';

type EntityResponseType = HttpResponse<IPlanification>;
type EntityArrayResponseType = HttpResponse<IPlanification[]>;

@Injectable({ providedIn: 'root' })
export class PlanificationService {
  public resourceUrl = SERVER_API_URL + 'api/planifications';

  constructor(protected http: HttpClient) {}

  create(planification: IPlanification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planification);
    return this.http
      .post<IPlanification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(planification: IPlanification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planification);
    return this.http
      .put<IPlanification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlanification>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlanification[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(planification: IPlanification): IPlanification {
    const copy: IPlanification = Object.assign({}, planification, {
      prevuLe: planification.prevuLe && planification.prevuLe.isValid() ? planification.prevuLe.toJSON() : undefined,
      faitLe: planification.faitLe && planification.faitLe.isValid() ? planification.faitLe.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.prevuLe = res.body.prevuLe ? moment(res.body.prevuLe) : undefined;
      res.body.faitLe = res.body.faitLe ? moment(res.body.faitLe) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planification: IPlanification) => {
        planification.prevuLe = planification.prevuLe ? moment(planification.prevuLe) : undefined;
        planification.faitLe = planification.faitLe ? moment(planification.faitLe) : undefined;
      });
    }
    return res;
  }
}
