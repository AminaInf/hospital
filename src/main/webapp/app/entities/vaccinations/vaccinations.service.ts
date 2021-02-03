import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVaccinations } from 'app/shared/model/vaccinations.model';

type EntityResponseType = HttpResponse<IVaccinations>;
type EntityArrayResponseType = HttpResponse<IVaccinations[]>;

@Injectable({ providedIn: 'root' })
export class VaccinationsService {
  public resourceUrl = SERVER_API_URL + 'api/vaccinations';

  constructor(protected http: HttpClient) {}

  create(vaccinations: IVaccinations): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vaccinations);
    return this.http
      .post<IVaccinations>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vaccinations: IVaccinations): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vaccinations);
    return this.http
      .put<IVaccinations>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVaccinations>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVaccinations[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(vaccinations: IVaccinations): IVaccinations {
    const copy: IVaccinations = Object.assign({}, vaccinations, {
      date: vaccinations.date && vaccinations.date.isValid() ? vaccinations.date.toJSON() : undefined,
      rappel: vaccinations.rappel && vaccinations.rappel.isValid() ? vaccinations.rappel.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
      res.body.rappel = res.body.rappel ? moment(res.body.rappel) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vaccinations: IVaccinations) => {
        vaccinations.date = vaccinations.date ? moment(vaccinations.date) : undefined;
        vaccinations.rappel = vaccinations.rappel ? moment(vaccinations.rappel) : undefined;
      });
    }
    return res;
  }
}
