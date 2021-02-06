import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoriqueConsultations, HistoriqueConsultations } from 'app/shared/model/historique-consultations.model';
import { HistoriqueConsultationsService } from './historique-consultations.service';
import { HistoriqueConsultationsComponent } from './historique-consultations.component';
import { HistoriqueConsultationsDetailComponent } from './historique-consultations-detail.component';
import { HistoriqueConsultationsUpdateComponent } from './historique-consultations-update.component';

@Injectable({ providedIn: 'root' })
export class HistoriqueConsultationsResolve implements Resolve<IHistoriqueConsultations> {
  constructor(private service: HistoriqueConsultationsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoriqueConsultations> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historiqueConsultations: HttpResponse<HistoriqueConsultations>) => {
          if (historiqueConsultations.body) {
            return of(historiqueConsultations.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoriqueConsultations());
  }
}

export const historiqueConsultationsRoute: Routes = [
  {
    path: '',
    component: HistoriqueConsultationsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.historiqueConsultations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoriqueConsultationsDetailComponent,
    resolve: {
      historiqueConsultations: HistoriqueConsultationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.historiqueConsultations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoriqueConsultationsUpdateComponent,
    resolve: {
      historiqueConsultations: HistoriqueConsultationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.historiqueConsultations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoriqueConsultationsUpdateComponent,
    resolve: {
      historiqueConsultations: HistoriqueConsultationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.historiqueConsultations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
