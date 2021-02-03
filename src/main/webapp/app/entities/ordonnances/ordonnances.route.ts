import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrdonnances, Ordonnances } from 'app/shared/model/ordonnances.model';
import { OrdonnancesService } from './ordonnances.service';
import { OrdonnancesComponent } from './ordonnances.component';
import { OrdonnancesDetailComponent } from './ordonnances-detail.component';
import { OrdonnancesUpdateComponent } from './ordonnances-update.component';

@Injectable({ providedIn: 'root' })
export class OrdonnancesResolve implements Resolve<IOrdonnances> {
  constructor(private service: OrdonnancesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrdonnances> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ordonnances: HttpResponse<Ordonnances>) => {
          if (ordonnances.body) {
            return of(ordonnances.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ordonnances());
  }
}

export const ordonnancesRoute: Routes = [
  {
    path: '',
    component: OrdonnancesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.ordonnances.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrdonnancesDetailComponent,
    resolve: {
      ordonnances: OrdonnancesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.ordonnances.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrdonnancesUpdateComponent,
    resolve: {
      ordonnances: OrdonnancesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.ordonnances.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrdonnancesUpdateComponent,
    resolve: {
      ordonnances: OrdonnancesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.ordonnances.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
