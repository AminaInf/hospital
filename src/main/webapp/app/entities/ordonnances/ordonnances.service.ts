import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrdonnances } from 'app/shared/model/ordonnances.model';

type EntityResponseType = HttpResponse<IOrdonnances>;
type EntityArrayResponseType = HttpResponse<IOrdonnances[]>;

@Injectable({ providedIn: 'root' })
export class OrdonnancesService {
  public resourceUrl = SERVER_API_URL + 'api/ordonnances';

  constructor(protected http: HttpClient) {}

  create(ordonnances: IOrdonnances): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordonnances);
    return this.http
      .post<IOrdonnances>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ordonnances: IOrdonnances): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordonnances);
    return this.http
      .put<IOrdonnances>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrdonnances>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrdonnances[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ordonnances: IOrdonnances): IOrdonnances {
    const copy: IOrdonnances = Object.assign({}, ordonnances, {
      date: ordonnances.date && ordonnances.date.isValid() ? ordonnances.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ordonnances: IOrdonnances) => {
        ordonnances.date = ordonnances.date ? moment(ordonnances.date) : undefined;
      });
    }
    return res;
  }
}
