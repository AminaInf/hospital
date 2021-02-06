import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRendezVous } from 'app/shared/model/rendez-vous.model';

type EntityResponseType = HttpResponse<IRendezVous>;
type EntityArrayResponseType = HttpResponse<IRendezVous[]>;

@Injectable({ providedIn: 'root' })
export class RendezVousService {
  public resourceUrl = SERVER_API_URL + 'api/rendez-vous';

  constructor(protected http: HttpClient) {}

  create(rendezVous: IRendezVous): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rendezVous);
    return this.http
      .post<IRendezVous>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rendezVous: IRendezVous): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rendezVous);
    return this.http
      .put<IRendezVous>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRendezVous>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRendezVous[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(rendezVous: IRendezVous): IRendezVous {
    const copy: IRendezVous = Object.assign({}, rendezVous, {
      date: rendezVous.date && rendezVous.date.isValid() ? rendezVous.date.toJSON() : undefined,
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
      res.body.forEach((rendezVous: IRendezVous) => {
        rendezVous.date = rendezVous.date ? moment(rendezVous.date) : undefined;
      });
    }
    return res;
  }
}
