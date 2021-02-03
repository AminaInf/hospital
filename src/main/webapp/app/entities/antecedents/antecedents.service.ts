import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAntecedents } from 'app/shared/model/antecedents.model';

type EntityResponseType = HttpResponse<IAntecedents>;
type EntityArrayResponseType = HttpResponse<IAntecedents[]>;

@Injectable({ providedIn: 'root' })
export class AntecedentsService {
  public resourceUrl = SERVER_API_URL + 'api/antecedents';

  constructor(protected http: HttpClient) {}

  create(antecedents: IAntecedents): Observable<EntityResponseType> {
    return this.http.post<IAntecedents>(this.resourceUrl, antecedents, { observe: 'response' });
  }

  update(antecedents: IAntecedents): Observable<EntityResponseType> {
    return this.http.put<IAntecedents>(this.resourceUrl, antecedents, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAntecedents>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAntecedents[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
