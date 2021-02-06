import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoriqueConsultations } from 'app/shared/model/historique-consultations.model';

type EntityResponseType = HttpResponse<IHistoriqueConsultations>;
type EntityArrayResponseType = HttpResponse<IHistoriqueConsultations[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueConsultationsService {
  public resourceUrl = SERVER_API_URL + 'api/historique-consultations';

  constructor(protected http: HttpClient) {}

  create(historiqueConsultations: IHistoriqueConsultations): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueConsultations);
    return this.http
      .post<IHistoriqueConsultations>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historiqueConsultations: IHistoriqueConsultations): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueConsultations);
    return this.http
      .put<IHistoriqueConsultations>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoriqueConsultations>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoriqueConsultations[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historiqueConsultations: IHistoriqueConsultations): IHistoriqueConsultations {
    const copy: IHistoriqueConsultations = Object.assign({}, historiqueConsultations, {
      date: historiqueConsultations.date && historiqueConsultations.date.isValid() ? historiqueConsultations.date.toJSON() : undefined,
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
      res.body.forEach((historiqueConsultations: IHistoriqueConsultations) => {
        historiqueConsultations.date = historiqueConsultations.date ? moment(historiqueConsultations.date) : undefined;
      });
    }
    return res;
  }
}
