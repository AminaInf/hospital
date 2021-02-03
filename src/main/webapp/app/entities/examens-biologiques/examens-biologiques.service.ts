import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExamensBiologiques } from 'app/shared/model/examens-biologiques.model';

type EntityResponseType = HttpResponse<IExamensBiologiques>;
type EntityArrayResponseType = HttpResponse<IExamensBiologiques[]>;

@Injectable({ providedIn: 'root' })
export class ExamensBiologiquesService {
  public resourceUrl = SERVER_API_URL + 'api/examens-biologiques';

  constructor(protected http: HttpClient) {}

  create(examensBiologiques: IExamensBiologiques): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examensBiologiques);
    return this.http
      .post<IExamensBiologiques>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(examensBiologiques: IExamensBiologiques): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examensBiologiques);
    return this.http
      .put<IExamensBiologiques>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExamensBiologiques>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExamensBiologiques[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(examensBiologiques: IExamensBiologiques): IExamensBiologiques {
    const copy: IExamensBiologiques = Object.assign({}, examensBiologiques, {
      date: examensBiologiques.date && examensBiologiques.date.isValid() ? examensBiologiques.date.toJSON() : undefined,
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
      res.body.forEach((examensBiologiques: IExamensBiologiques) => {
        examensBiologiques.date = examensBiologiques.date ? moment(examensBiologiques.date) : undefined;
      });
    }
    return res;
  }
}
